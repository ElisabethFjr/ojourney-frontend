// Import Styles
import './Main.scss';

interface MainProps {
  children: React.ReactNode;
}

function Main({ children }: MainProps) {
  return (
    <main className="main">
      <div className="main-container">{children}</div>
    </main>
  );
}

export default Main;
