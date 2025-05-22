"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Imovel.module.css";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Imoveis() {
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
            try {
                const { data: imoveis } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/imoveis`,
                    {
                        headers: HEADERS,
                    }
                );
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
                    src="/image/loading.gif"
                    width={300}
                    height={200}
                    alt="Loading"
                />
            ) : (
                <div className={styles.cardsContainer}>
                    {paginatedImoveis().map((imovel) => (
                        <Card
                            key={imovel.id}
                            className={styles.card}
                            hoverable
                            onClick={() => Number.isInteger(imovel.id) && openModal(imovel)}
                            cover={
                                <Image
                                    alt={imovel.nome_imovel || "Imagem do imóvel"}
                                    src={
                                        typeof imovel.photo === "string" && imovel.photo.trim() !== ""
                                            ? imovel.photo.startsWith("/")
                                                ? imovel.photo
                                                : "/" + imovel.photo
                                            : "/image/1747930702530-images.jpg"
                                    }
                                    width={220}
                                    height={220}
                                />
                            }
                        >
                            <Card.Meta
                                title={imovel.nome_imovel}
                            />
                        </Card>
                    ))}
                </div>
            )}


            <ToastContainer position="top-right" autoClose={4500} />
        </div>
    );
}