import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import MovieRow from "@/components/movieRow";
import { CircleNotch } from '@phosphor-icons/react';
   
export default function MovieChoice(){    
    const themes = {    
        sort_by: [
                    'Popularidade', 
                    'Baixa avaliação', 
                    'Taxa de Votos Crescente', 
                    'Contagem de Votos Descrescente', 
                    'Contagem de Votos Crescente', 
                    'Data de Lançamento Descrescente', 
                    'Data de Lançamento Crescente'
                ],
        genre: ['Drama', 'Romance', 'Ação', 'Animação', 'Comédia', 'Fantasia', 'Terror', 'Suspense'],
        without_genres: ['Drama', 'Romance', 'Ação', 'Animação', 'Comédia', 'Fantasia', 'Terror', 'Suspense'],
        vote_average: ['7.0', '6.0', '8.0', '4.0', '3.0', '5.5', '6.7', '7.8', '1.0', '7.7', '6.8', '3.5', '2.0', '8.0', '7.9', '7.8', '7.0', '7.4', '7.5', '7.7'],        
        year: ['2001', '2002', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011','1990', '1980', '2023', '2003', '1970', '2012', '2003', '1999', '1991', '1987'],              
    }                    

    // useState - match params    
    const [year, setYear] = useState('')    
    const [genre, setGenre] = useState('')
    const [sort_by, setSort_by] = useState('')
    const [without_genres, setWithout_genres] = useState('')    
    const [vote_average, setVote_average] = useState('')
    // useState - data
    const [movie, setMovie] = useState()
    const [serie, setSerie] = useState()    
    const [count, setCount] = useState(0)       
    const [topic, setTopic]  = useState('Ordenar Por')
    const [firstOption, setfirstOption] = useState('')
    const [secondOption, setsecondOption] = useState('')         
    // useState - dynamic match style
    const [loadMatch, setLoad] = useState(true)

    // useEffect
    useEffect(()=>{
        if(firstOption === '' && secondOption === '')
        {
            setfirstOption(themes.sort_by[Math.floor(Math.random() * themes.sort_by.length)])
            setsecondOption(themes.sort_by[Math.floor(Math.random() * themes.sort_by.length)])
        }        
    })

    // functions - matching           
    const changeIndex = (idx:number) =>{               
        fillMatch(idx)
        setCount(count+1)
    }    
    const fillMatch = (idx:number) => {               
        let value:string = ''
        switch(count)
        {
            case 0: // sort_by                                
                value = ''                
                if(idx === 1){                    
                    switch(firstOption)
                    {
                        case 'Popularidade':
                            value = 'popularity.desc'
                            break;
                        case 'Taxa de Votos Decrescente':
                            value = 'vote_average.desc'
                            break;
                        case 'Taxa de Votos Crescente':
                            value = 'vote_average.asc'
                            break;
                        case 'Contagem de Votos Descrescente':
                            value = 'vote_count.desc'
                            break;
                        case 'Contagem de Votos Crescente':
                            value = 'vote_count.asc'
                            break;
                        case 'Data de Lançamento Descrescente':
                            value = 'primary_release_date.desc'
                            break;
                        case 'Data de Lançamento Crescente':
                            value = 'primary_release_date.asc'
                            break;
                    }

                    setSort_by(value)
                }
                else{
                    switch(secondOption)
                    {
                        case 'Popularidade':
                            value = 'popularity.desc'
                            break;
                        case 'Taxa de Votos Decrescente':
                            value = 'vote_average.desc'
                            break;
                        case 'Taxa de Votos Crescente':
                            value = 'vote_average.asc'
                            break;
                        case 'Contagem de Votos Descrescente':
                            value = 'vote_count.desc'
                            break;
                        case 'Contagem de Votos Crescente':
                            value = 'vote_count.asc'
                            break;
                        case 'Data de Lançamento Descrescente':
                            value = 'primary_release_date.desc'
                            break;
                        case 'Data de Lançamento Crescente':
                            value = 'primary_release_date.asc'
                            break;
                    }
                    
                    setSort_by(value)
                }
                
                setTopic('Taxa de Média de Votos')   
                setfirstOption(themes.vote_average[Math.floor(Math.random() * themes.vote_average.length)])     
                setsecondOption(themes.vote_average[Math.floor(Math.random() * themes.vote_average.length-1)])                                
                break;

            case 1: // vote_average                                                                                               
                if(idx === 1){
                    setVote_average(firstOption)
                }
                else{
                    setVote_average(secondOption)
                }

                setTopic('Gênero que quero adicionar a busca')                        
                setfirstOption(themes.genre[Math.floor(Math.random() * themes.genre.length)])     
                setsecondOption(themes.genre[Math.floor(Math.random() * themes.genre.length-1)])                
                break;

            case 2: // genre 
                value = ''                                                               
                if(idx === 1){
                    switch(firstOption)
                    {
                        case 'Ação':
                            value = 'action'
                            break;
                        case 'Animação':
                            value = 'animation'
                            break;
                        case 'Drama':
                            value = 'drama'
                            break;
                        case 'Comédia':
                            value = 'comedy'
                            break;
                        case 'Suspense':
                            value = 'mistery'
                            break;
                        case 'Terror':
                            value = 'horror'
                            break;
                        case 'Fantasia':
                            value = 'fantasy'
                            break; 
                        case 'Romance':
                            value = 'romance'
                            break;                            
                    }
                    setGenre(value)
                }
                else{
                    switch(secondOption)
                    {
                        case 'Ação':
                            value = 'action'
                            break;
                        case 'Animação':
                            value = 'animation'
                            break;
                        case 'Drama':
                            value = 'drama'
                            break;
                        case 'Comédia':
                            value = 'comedy'
                            break;
                        case 'Suspense':
                            value = 'mistery'
                            break;
                        case 'Terror':
                            value = 'horror'
                            break;
                        case 'Fantasia':
                            value = 'fantasy'
                            break; 
                        case 'Romance':
                            value = 'romance'
                            break;                            
                    }
                    setGenre(value)                    
                }
                                    
                setTopic('Gênero a ser retirado da busca')      
                setfirstOption(themes.without_genres[Math.floor(Math.random() * themes.without_genres.length)])     
                setsecondOption(themes.without_genres[Math.floor(Math.random() * themes.without_genres.length-1)])                                
                break; 

            case 3: // without_genres                                                                          
                value = ''                                                               
                if(idx === 1){
                    switch(firstOption)
                    {
                        case 'Ação':
                            value = 'action'
                            break;
                        case 'Animação':
                            value = 'animation'
                            break;
                        case 'Drama':
                            value = 'drama'
                            break;
                        case 'Comédia':
                            value = 'comedy'
                            break;
                        case 'Suspense':
                            value = 'mistery'
                            break;
                        case 'Terror':
                            value = 'horror'
                            break;
                        case 'Fantasia':
                            value = 'fantasy'
                            break; 
                        case 'Romance':
                            value = 'romance'
                            break;                            
                    }
                    setGenre(value)
                }
                else{
                    switch(secondOption)
                    {
                        case 'Ação':
                            value = 'action'
                            break;
                        case 'Animação':
                            value = 'animation'
                            break;
                        case 'Drama':
                            value = 'drama'
                            break;
                        case 'Comédia':
                            value = 'comedy'
                            break;
                        case 'Suspense':
                            value = 'mistery'
                            break;
                        case 'Terror':
                            value = 'horror'
                            break;
                        case 'Fantasia':
                            value = 'fantasy'
                            break; 
                        case 'Romance':
                            value = 'romance'
                            break;                            
                    }
                    setGenre(value)                    
                }

                setTopic('Ano')                
                setfirstOption(themes.year[Math.floor(Math.random() * themes.year.length)])     
                setsecondOption(themes.year[Math.floor(Math.random() * themes.year.length-1)])               
                break;  

            case 4: // year                
                if(idx === 1){
                    setYear(firstOption)
                }
                else{
                    setYear(secondOption)
                }
                                                         
                setLoad(!loadMatch)
                getMatchResults()
                break;                     

            default:        
                break;
        }        
    }
    const getMatchResults = async () => {            
        const responseMovies = await fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=pt-BR&page=1"+
                                            "&sort_by=" + sort_by + 
                                            "&vote_average.lte="+ vote_average +
                                            "&with_genres=" + genre +                                             
                                            "&without_genres=" + without_genres +
                                            "&year=" + year
                                            , {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
                accept: "application/json",
            },
        })
        const responseSeries = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=pt-BR&page=1'+
                                            "&sort_by=" + sort_by + 
                                            "&vote_average.lte="+ vote_average +
                                            "&with_genres=" + genre +                                             
                                            "&without_genres=" + without_genres +
                                            "&year=" + year
                                            , {
           headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
              'accept': 'application/json'
         }
        })
        
        const resMovies = await responseMovies.json()
        const resSeries = await responseSeries.json()        
        
        setMovie(resMovies.results)
        setSerie(resSeries.results)
    }  
    const resfreshMatch = () =>{
        setCount(0)        
        setLoad(true)        
        setTopic('Ordenar Por')
        setMovie(undefined)
        setSerie(undefined)
        setfirstOption(themes.sort_by[Math.floor(Math.random() * themes.sort_by.length)])     
        setsecondOption(themes.sort_by[Math.floor(Math.random() * themes.sort_by.length)])
    } 
    const refreshOptions = () =>{
        switch(count)
        {
            case 0:
                setfirstOption(themes.sort_by[Math.floor(Math.random() * themes.sort_by.length)])     
                setsecondOption(themes.sort_by[Math.floor(Math.random() * themes.sort_by.length)])
                break;
            case 1:
                setfirstOption(themes.vote_average[Math.floor(Math.random() * themes.vote_average.length)])     
                setsecondOption(themes.vote_average[Math.floor(Math.random() * themes.vote_average.length)])
                break;
            case 2:
                setfirstOption(themes.genre[Math.floor(Math.random() * themes.genre.length)])     
                setsecondOption(themes.genre[Math.floor(Math.random() * themes.genre.length)])
                break;
            case 3:
                setfirstOption(themes.without_genres[Math.floor(Math.random() * themes.without_genres.length)])     
                setsecondOption(themes.without_genres[Math.floor(Math.random() * themes.without_genres.length)])
                break;
            case 4:
                setfirstOption(themes.year[Math.floor(Math.random() * themes.year.length)])     
                setsecondOption(themes.year[Math.floor(Math.random() * themes.year.length)])
                break;
            default:
                break;
        }        
    }  

    // jsx
    return(
        <div>
            <div className='flex flex-col'>                              
                <div>
                    {
                        loadMatch ?
                        (
                            <div className='flex items-center'>
                                <div className='flex justify-start w-full'><h2 style={{'textAlign': 'left'}}><strong>Qual você prefere?</strong></h2></div>
                                <div className='flex  w-full'>                            
                                    <strong>Tópico:</strong> {topic}                             
                                </div>
                                <div style={{textAlign: 'right'}} className='flex justify-end w-full'>                               
                                    <div style={{ width: '60px', height: '60px', marginBottom:'10px', 'textAlign': 'right'}}
                                    >                                                                                    
                                        <CircularProgressbar                                 
                                            className="Counter"                                     
                                            value={count} 
                                            maxValue={5} 
                                            text={`${count}/5`}
                                        />                                                                                                
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                           <div></div>
                        )
                    }
                </div>          
                </div>                        
                <div className='w-full flex flex-col'>
                    {
                        loadMatch ?
                        (                           
                            <div className='w-full flex justify-center items-center'>                                                               
                                <div
                                    className='bg-orange-400 hover:bg-orange-500 cursor-pointer w-1/2 h-60 rounded-l-lg flex justify-center items-center text-center' 
                                    onClick={()=>changeIndex(1)}                                                                  
                                    >
                                        <strong className='text-xl'>{firstOption}</strong>                     
                                </div>                        
                                <div
                                    className='bg-teal-600 hover:bg-teal-500 cursor-pointer w-1/2 h-60 rounded-r-lg flex justify-center items-center text-center'
                                    onClick={()=>changeIndex(2)}                                                                 
                                    >
                                        <strong className='text-xl'>{secondOption}</strong>
                                </div>                                
                            </div>                                    
                            
                        )
                        :
                        (                        
                            (
                                movie !== undefined
                                && serie !== undefined
                            ) ?
                            (
                                <div>
                                    <div
                                        // style={styles.sugestionsAreaStyle}
                                    >
                                        <div className="flex flex-col items-center">
                                            <MovieRow key={1} content={movie} title="Sugestões de Filme" rowID={1} />                                            
                                            <MovieRow key={2} content={serie} title="Sugestões de Séries" rowID={2} />                                            
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div>
                                    <div className='flex justify-center items-center p-28'>
                                            <CircleNotch className='animate-spin' size={48} weight="fill" /> 
                                            <span className="visually-hidden text-5xl">Loading...</span>
                                    </div>
                                </div>
                            )                        
                        )
                    }   
                    <div>
                        <div className='flex'>
                            <Button 
                                variant="primary"
                                onClick={()=>refreshOptions()}
                                style={{
                                    padding: '15px'
                                }}
                            >
                                Atualizar Opções
                            </Button>
                            <Button 
                                variant="primary"
                                onClick={()=>resfreshMatch()}
                                style={{
                                    padding: '15px'
                                }}
                            >
                                Reiniciar Match
                            </Button>
                        </div>  
                    </div>                                 
                </div>                
                           
        </div>
    )
}

