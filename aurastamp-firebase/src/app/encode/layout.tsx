import { NavLayout } from '../components/NavLayout';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return <NavLayout>{children}</NavLayout>;
}
