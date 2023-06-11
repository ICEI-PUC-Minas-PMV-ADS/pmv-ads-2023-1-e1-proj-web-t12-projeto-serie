import BottomNav from '@/components/bottomNav'
import TopNav from '@/components/topNav'
import { Inter } from 'next/font/google'
import React from 'react'
import 'react-circular-progressbar/dist/styles.css';
import MovieChoice from '@/components/movieChoice';

const inter = Inter({ subsets: ['latin'] })

export default function match() {  
    // styles
    const styles = {
        MainBlockStyle:{
            width: '100%px',
            height: '100%px',
            'marginTop':'70px',
            'marginLeft':'70px',
            'marginRight':'70px',        
        },   
        
        titleStyle:{
            fontSize: '40px',
        }
    }  
    
    return (
        <>
        <TopNav />          
        <main 
            className="flex min-h-screen flex-col items-center pr-28 pl-28">       
                <div style={styles.MainBlockStyle}>
                    <div>
                        <h1
                            style={styles.titleStyle}
                        >
                            Escolhemos um entretenimento para você.
                        </h1>
                        <p>Vamos fazer as perguntas, você escolhe qual combina com você e depois de 5 perguntas vamos indicar algo para você.</p>
                    </div>
                    <div>                    
                        <MovieChoice/>                        
                    </div>
                </div> 
            </main>          
        <BottomNav />
    </>
    )
}
