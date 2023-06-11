import { LocalStorageContext } from "@/hooks/useLocalStorage";
import { Calendar, FilmSlate, FilmStrip, Funnel, MagnifyingGlass, Television } from "@phosphor-icons/react";
import React, { useContext, useState } from "react";

const Filter = () => {
    const { handleOpenFilter, openFilter, updateSelectedFilter } = useContext(LocalStorageContext);
    const [selectedDecade, setSelectedDecade] = useState(1910);

    // const [showFilters, setShowfilters] = useState(true);
    const handleChange = (event: { target: { value: string; }; }) => {
      setSelectedDecade(parseInt(event.target.value));
    };
    const [check, setCheck] = useState({
        movie: false,
        serie: false,
    });

    const { movie, serie } = check;

    const changeHandler = (e: { target: { name: any; checked: any; }; }) => {
        setCheck({
            ...check,
            [e.target.name]: e.target.checked,
        });
    };

    const applyFilters = (e: any) => {
        e.preventDefault() 
        setCheck({
            ...check,
            movie: false,
            serie: false,
        });
        console.log(check);
        updateSelectedFilter(check)
        handleOpenFilter(false)


    };

    return (
        
        <div className="2xl:container 2xl:mx-auto">
            <div className="">
                <div className=" flex justify-between items-center mb-4">
    
                {/* <button onClick={() => setShowfilters(!showFilters)} className="flex-shrink-0 flex md:flex z-10 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                         <Funnel size={20} className='fill-black dark:fill-white'  />
                    </button> */}
                </div>  

                {/* Modal de busca */}

                <button  className="cursor-pointer mt-6 block sm:hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2 w-full bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center">
                    <svg className=" mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 4V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 12V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 4V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 18V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18 4V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18 9V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Filters
                </button>
            </div>

            <div id="filterSection" className={"relative md:py-10 lg:px-20 md:px-6 py-9 px-4 dark:bg-zinc-900 bg-gray-300 w-full "}>
                {/* Cross button Code  */}
                <div onClick={() => handleOpenFilter(false)} className=" cursor-pointer absolute right-8 top-8">
                    <svg className=" lg:w-6 lg:h-6 w-4 h-4 stroke-zinc-900 dark:stroke-slate-200" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 1L1 25"  strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1L25 25"  strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Colors Section */}
                <div>
                    <div className=" flex space-x-2">
                        <MagnifyingGlass size={24}  />
                        <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium  ">Tipo de pesquisa:</p>
                    </div>
                    <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
                        <div className=" flex space-x-2 md:justify-center md:items-center items-center justify-start">
                            <input className="w-4 h-4 mr-2 hidden" type="checkbox" id="movie" name="movie" value="movie" checked={movie} onChange={changeHandler} />
                            <div className=" inline-block">
                                <div className=" flex space-x-6 justify-center items-center">
                                    <label className=" mr-2 text-sm leading-3 font-normal flex items-center gap-2 cursor-pointer" htmlFor="movie">
                                        {movie ?   <FilmStrip  size={32} weight="fill" /> : <FilmStrip size={32} />}
                                        Filme
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-center items-center">
                            <input className="w-4 h-4 mr-2 hidden" type="checkbox" id="serie" name="serie" value="serie" checked={serie} onChange={changeHandler} />
                            <div className=" inline-block">
                                <div className=" flex space-x-6 justify-center items-center">
                                    <label className=" mr-2 text-sm leading-3 font-normal flex items-center gap-2 cursor-pointer" htmlFor="serie">
                                        {serie ?   <Television size={32} weight="fill" /> : <Television size={32} />}
                                        Série
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />
                {/* Date */}
                <div>
                    <div className=" flex space-x-2">
                    <Calendar size={24} />
                        <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium  ">Ano de lançamento:</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Em breve</span>
                    <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
                        <div className=" flex space-x-2 md:justify-center md:items-center items-center justify-start">
                            <input className="w-4 h-4 mr-2 hidden" type="checkbox" id="movie" name="movie" value="movie" checked={movie} onChange={changeHandler} />
                            <div className=" inline-block">
                                <div className=" flex flex-col space-x-6 justify-center items-center">
                                    

                                    <select id="decade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                     value={selectedDecade} onChange={handleChange}>
                                        {Array.from({ length: 12 }, (_, index) => {
                                        const decade = 1910 + index * 10;
                                        return (
                                            <option key={decade} value={decade}>
                                            {decade}s
                                            </option>
                                        );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

          

                <div className="px-0 mt-10 w-full md:w-auto md:mt-0 md:absolute md:right-0 md:bottom-0 md:py-10 lg:px-20 md:px-6">
                    <button onClick={applyFilters} className="w-full hover:bg-red-700 focus:ring focus:ring-offset-2 focus:ring-red-800 text-base leading-4 font-medium py-4 px-10 text-white bg-red-600 border">
                        Salvar filtro
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
