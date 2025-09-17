import torch
import torch.nn as nn
import torch.optim as optim
import random

# -----------------
# 1. Sample dataset (replace with big dataset later)
# -----------------
pairs = [
    ("make a function to add two numbers", "function add(a,b){ console.log(a+b); }"),
    ("create function to subtract numbers", "function subtract(a,b){ console.log(a-b); }"),
    ("make function to greet user", "function greet(name){ console.log('Hello ' + name); }"),
]

# Build vocabulary
def tokenize(text):
    return text.lower().replace("(", " ( ").replace(")", " ) ").replace("{"," { ").replace("}"," } ").replace(";", " ; ").split()

src_vocab = {"<PAD>":0, "<SOS>":1, "<EOS>":2}
tgt_vocab = {"<PAD>":0, "<SOS>":1, "<EOS>":2}

for src, tgt in pairs:
    for tok in tokenize(src): 
        if tok not in src_vocab: src_vocab[tok] = len(src_vocab)
    for tok in tokenize(tgt):
        if tok not in tgt_vocab: tgt_vocab[tok] = len(tgt_vocab)

inv_tgt_vocab = {i:w for w,i in tgt_vocab.items()}

def encode(text, vocab):
    return [vocab.get(tok,0) for tok in tokenize(text)] + [vocab["<EOS>"]]

def pad(seq, maxlen):
    return seq + [0]*(maxlen-len(seq))

src_seqs = [encode(src, src_vocab) for src,_ in pairs]
tgt_seqs = [encode(tgt, tgt_vocab) for _,tgt in pairs]

max_src = max(len(s) for s in src_seqs)
max_tgt = max(len(s) for s in tgt_seqs)

src_seqs = [pad(s,max_src) for s in src_seqs]
tgt_seqs = [pad(s,max_tgt) for s in tgt_seqs]

src_tensor = torch.tensor(src_seqs)
tgt_tensor = torch.tensor(tgt_seqs)

# -----------------
# 2. Seq2Seq Model
# -----------------
class Encoder(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim):
        super().__init__()
        self.embed = nn.Embedding(vocab_size, embed_dim)
        self.rnn = nn.GRU(embed_dim, hidden_dim, batch_first=True)

    def forward(self, x):
        emb = self.embed(x)
        outputs, hidden = self.rnn(emb)
        return hidden

class Decoder(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim):
        super().__init__()
        self.embed = nn.Embedding(vocab_size, embed_dim)
        self.rnn = nn.GRU(embed_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, vocab_size)

    def forward(self, x, hidden):
        emb = self.embed(x)
        output, hidden = self.rnn(emb, hidden)
        out = self.fc(output)
        return out, hidden

class Seq2Seq(nn.Module):
    def __init__(self, encoder, decoder):
        super().__init__()
        self.encoder = encoder
        self.decoder = decoder

    def forward(self, src, tgt):
        hidden = self.encoder(src)
        inputs = tgt[:, :-1]  # teacher forcing
        outputs, _ = self.decoder(inputs, hidden)
        return outputs

# -----------------
# 3. Training
# -----------------
enc = Encoder(len(src_vocab), 32, 64)
dec = Decoder(len(tgt_vocab), 32, 64)
model = Seq2Seq(enc, dec)

criterion = nn.CrossEntropyLoss(ignore_index=0)
optimizer = optim.Adam(model.parameters(), lr=0.01)

for epoch in range(200):
    optimizer.zero_grad()
    outputs = model(src_tensor, tgt_tensor)
    loss = criterion(outputs.reshape(-1, outputs.size(-1)), tgt_tensor[:,1:].reshape(-1))
    loss.backward()
    optimizer.step()
    if epoch % 50 == 0:
        print(f"Epoch {epoch}, Loss {loss.item():.4f}")

# -----------------
# 4. Inference
# -----------------
def generate(prompt, max_len=20):
    with torch.no_grad():
        src = torch.tensor([pad(encode(prompt, src_vocab), max_src)] )
        hidden = enc(src)
        inp = torch.tensor([[tgt_vocab["<SOS>"]]])
        result = []
        for _ in range(max_len):
            out, hidden = dec(inp, hidden)
            token = out.argmax(-1)[:,-1].item()
            if token == tgt_vocab["<EOS>"]:
                break
            result.append(inv_tgt_vocab[token])
            inp = torch.tensor([[token]])
        return " ".join(result)

print("\nGenerated code:")
print(generate("make a function to add two numbers"))
