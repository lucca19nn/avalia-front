"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Imovel.module.css";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Alunos() {
    const [data, setData] = useState({
        imoveis: [],
        loading: true,
        current: 1,
        pageSize: 0,
    });

    const [modalInfo, setModalInfo] = useState({
        visible: false,
        imovel: null,
        avaliacao: null,
        loading: false,
    });

    useEffect(() => {
        const fetchImoveis = async () => {
            if (cached.length > 0) {
                setData({ imoveis: cached, loading: false, current: 1, pageSize: 5 });
                return;
            }

            try {
                const { data: imoveis } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/imoveis`,
                    {
                        headers: HEADERS,
                    }
                );
                setSessionStorage("imoveisData", imoveis);
                setData({ imoveis, loading: false, current: 1, pageSize: 5 });
            } catch {
                toast.error("Erro ao carregar imóveis");
                setData((d) => ({ ...d, loading: false }));
            }
        };

        fetchImoveis();
    }, []);

    const openModal = async (imovel) => {
        setModalInfo({ visible: true, imovel, avaliacao: null, loading: true });

        const cacheKey = `avaliacao_${imovel.id}`;
        const cached = getSessionStorage(cacheKey, null);
        if (cached) {
            setModalInfo((m) => ({ ...m, avaliacao: cached, loading: false }));
            return;
        }

        try {
            const { data: avaliacao } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/avaliacao/${imovel.id}`,
                {
                    headers: HEADERS,
                }
            );
            setModalInfo((m) => ({ ...m, avaliacao, loading: false }));
        } catch {
            toast.error("Erro ao carregar avaliação.");
            setModalInfo((m) => ({ ...m, loading: false }));
        }
    };

    const paginatedImoveis = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.imoveis.slice(start, start + data.pageSize);
    };

    return (
        <div>
            <h1>Lista de Imóveis</h1>

            <Pagination
                current={data.current}
                pageSize={data.pageSize}
                total={data.imoveis.length}
                onChange={(page, size) =>
                    setData((d) => ({ ...d, current: page, pageSize: size }))
                }
                showSizeChanger
                pageSizeOptions={["5", "10", "100"]}
            />

            {data.loading ? (
                <Image
                    src="/images/loading.gif"
                    width={300}
                    height={200}
                    alt="Loading"
                />
            ) : (
                <div className={styles.cardsContainer}>
                    {paginatedAlunos().map((aluno) => (
                        <Card
                            key={aluno.id}
                            className={styles.card}
                            hoverable
                            onClick={() => openModal(aluno)}
                            cover={
                                <Image
                                    alt={aluno.name_estudante}
                                    src={aluno.photo ? aluno.photo : "/images/220.svg"}
                                    width={220}
                                    height={220}
                                />
                            }
                        >
                            <Card.Meta
                                title={aluno.name_estudante}
                            />
                        </Card>
                    ))}
                </div>
            )}

            <Modal
                title={`Avaliação de ${modalInfo.aluno?.name_estudante}`}
                open={modalInfo.visible}
                onCancel={() =>
                    setModalInfo({
                        visible: false,
                        aluno: null,
                        avaliacao: null,
                        loading: false,
                    })
                }
                onOk={() =>
                    setModalInfo({
                        visible: false,
                        aluno: null,
                        avaliacao: null,
                        loading: false,
                    })
                }
                width={600}
            >
                {modalInfo.loading ? (
                    <Skeleton active />
                ) : modalInfo.avaliacao ? (
                    <div className={styles.avaliacaoInfo}>
                        <p>
                            <span className={styles.label}>Nota:</span>{" "}
                            {modalInfo.avaliacao.nota}
                        </p>
                        <p>
                            <span className={styles.label}>Professor:</span>{" "}
                            {modalInfo.avaliacao.professor}
                        </p>
                        <p>
                            <span className={styles.label}>Matéria:</span>{" "}
                            {modalInfo.avaliacao.materia}
                        </p>
                        <p>
                            <span className={styles.label}>Sala:</span>{" "}
                            {modalInfo.avaliacao.sala}
                        </p>
                    </div>
                ) : (
                    <p style={{ textAlign: "center" }}>Avaliação não encontrada.</p>
                )}
            </Modal>

            <ToastContainer position="top-right" autoClose={4500} />
        </div>
    );
}