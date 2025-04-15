import BossesList from "../components/bossesList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <BossesList />
      </main>

      <footer className={styles.footer}>
        <p>Desenvolvido por <span className={styles.span}>Vitor de Almeida Argeri</span></p>
      </footer>
    </div>
  );
}