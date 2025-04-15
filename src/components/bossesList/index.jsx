"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./bossesList.module.css";

export default function BossesList() {
    const url = "https://eldenring.fanapis.com/api/bosses"

    const [bosses, setBosses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBosses = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                setBosses(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log("Erro ao buscar bosses na API")
                setError("Não foi possível carregar os bosses, tente novamente mais tarde ");
                setLoading(false);
            }
        }
        fetchBosses();
    }, [])

    if (loading == true) {
        return (
            <div className={styles.loading}>
                Carregando Bosses...
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.error}>
                Não foi possível carregar os bosses, tente novamente mais tarde
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.bossesTitle}>Bosses de Elden Ring</h1>
            <div className={styles.bossesGrid}>
                {bosses.map((boss) => (
                    <div key={boss.id} className={styles.bossCard}>
                        <div className={styles.bossImageContainer}>
                            <img src={boss.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTheoVbPv4QDXIPlVMOQvl324IBnjNDwk6fCQ&s"} alt={boss.name || "sem imagem"} className={styles.bossImage} />
                        </div>

                        <div className={styles.bossInfo}>
                            <h2 className={styles.bossName}>{boss.name}</h2>
                            <p className={styles.bossDescription}>{boss.description}</p>
                            <p className={styles.bossRegion}><strong>Região</strong> {boss.region}</p>
                            <p className={styles.bossLocation}><strong>Local:</strong> {boss.location}</p>
                            <p className={styles.bossDrops}><strong>Drops:</strong>
                                <ul className={styles.ul}>
                                    {boss.drops.map((drop, index) => (
                                        <li className={styles.li} key={index}>{drop}</li>
                                    ))}
                                </ul>
                            </p>
                            <p className={styles.bossHealthPoints}><strong>Pontos de Vida </strong>{boss.healthPoints}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}