import { BellProvider } from "../context/BellContext";

export default function BellPagesWrapper({ children }: { children: React.ReactNode }) {
  return <BellProvider>{children}</BellProvider>;
}