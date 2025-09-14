import { useState } from "react";

export default function useSpinner() {
  const [loading, setLoading] = useState(false);

  const showSpinner = () => setLoading(true);
  const hideSpinner = () => setLoading(false);

  return { loading, showSpinner, hideSpinner };
}
