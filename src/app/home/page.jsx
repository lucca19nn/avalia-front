import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";
import { Button } from "antd";

export default function Home() {
    return (
        <div className={styles.page}>
        <main className={styles.main}>
            <div className={styles.container}>
                <Image
                    className={styles.logo}
                    src="/image/eu.jfif"
                    alt="Next.js logo"
                    width={300}
                    height={300}
                />
                <h1 className={styles.title}> André Lucca Santos </h1>
                <h2 className={styles.subtitle}>Turma: <span className={styles.text}>3TDS1</span></h2>
                <p className={styles.description}>Front-end | Atividade avaliativa</p>
                <p className={styles.secondDescription}>Criei uma API sobre proprietarios e seus imoveis</p>
                <p className={styles.thirdDescription}>Thiago | Marcelo 👨‍🏫</p>

                <Link href="/imoveis" prefetch>
                        <Button type="primary" size="large">
                            Veja os imoveis
                        </Button>
                    </Link>
            </div>
        </main>
        </div>
    );
}