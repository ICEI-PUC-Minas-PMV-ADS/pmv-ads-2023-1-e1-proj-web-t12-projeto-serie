    import { LocalStorageContext } from '@/hooks/useLocalStorage';
import { Calendar, FilmSlate, Funnel, Star, TelevisionSimple } from '@phosphor-icons/react';
    import { useContext, useState } from 'react';

    interface DropdownOption {
    title: string;
    icon: string;
    }

    interface DropdownProps {
    options: DropdownOption[];
    onChange: (option: DropdownOption) => void;
    }


    const Dropdown = ({ options, onChange }: DropdownProps) => {
        const { selectedFilter, updateSelectedFilter } = useContext(LocalStorageContext);
        // console.log(selectedFilter);

    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
    let optionActived
    switch (option.title){
        case 'Filmes':
            optionActived = "movie"
        break;
        case 'Séries':
            optionActived = "series"
            break;
    }
    localStorage.setItem('selectedFilter', optionActived || "");
    setIsSelected(true)
    };

    return (
    <div className="relative">
    <button
    type="button"
    data-dropdown-toggle="dropdown" 
    className="flex-shrink-0 flex md:flex z-10 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
    onClick={() => setIsOpen(!isOpen)}
    >
    {isSelected ?
    <Funnel size={20} className='fill-black dark:fill-white' weight='fill' /> : 
    <Funnel size={20} className='fill-black dark:fill-white'  />
    }
    <svg
    className="fill-current h-4 w-4 ml-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    >
    <path d="M10 14l6-6H4z" />
    </svg>
    </button>

    {isOpen && (
    <div id="dropdown" className="absolute top-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 z-50">
    <ul className="py-2 text-sm text-gray-100 dark:text-gray-200" aria-labelledby="dropdown-button">
    {options.map((option) => (
    <li key={option.title} >
    <button
    type="button"
    key={option.title}
    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white "
    onClick={() => handleOptionClick(option)}
    >
    {option.title === 'Filmes' ? <FilmSlate size={32} color="#E9F4FF" /> : null}
    {option.title === 'Séries' ? <TelevisionSimple size={32} color="#E9F4FF" /> : null}
    {option.title === 'Celebridade' ? <Star size={32} color="#E9F4FF" /> : null}
    {option.title === 'Ano' ? <Calendar size={32} color="#E9F4FF" /> : null}

    <span className="ml-2">{option.title}</span>
    </button>
    </li>
    ))}
    </ul>
    </div>
    )}
    </div>
    );
    };

    export default Dropdown;
