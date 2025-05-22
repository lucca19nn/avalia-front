import Image from "next/image";
import styles from "./Home.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
        <main className={styles.main}>
            <Image
            className={styles.logo}
            src="/image/eu.jfif"
            alt="Next.js logo"
            width={300}
            height={300}
            />
            <h1 className={styles.title}> André Lucca Santos </h1>
            <h2 className={styles.subtitle}>Turma: <span className={styles.text}>2TDS3</span></h2>
            <p className={styles.description}> Olá, eu sou um desenvolvedor Front-end e estou criando meu portifólio. </p>
        </main>
        </div>
    );
}