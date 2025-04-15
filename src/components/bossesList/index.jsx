"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./filmList.module.css";

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
                setBosses(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Erro ao buscar bosses na API")
                setError("Não foi possível carregar os bosses, tente novamente mais tarde ");
                setLoading(false);
            }
        }
        fetchFilms();
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
            <h1 className={styles.title}>Filmes do Studio Ghibli</h1>
            <div className={styles.filmGrid}>
                {films.map((film) => (
                    <div key={film.id} className={styles.filmCard}>
                        <div className={styles.imageContainer}>
                            <img src={film.image} alt={film.title} className={styles.image} />
                        </div>
                        <div className={styles.content}>
                            <h2 className={styles.filmTitle}>{film.title}</h2>
                            <p className={styles.director}>Diretor: {film.director}</p>
                            <p className={styles.year}>{film.release_date}</p>
                            <div className={styles.rating}>
                                <span className={styles.score}>{film.rt_score}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}