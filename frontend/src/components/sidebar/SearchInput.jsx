import React, { useState, useEffect } from 'react';
import { IoSearchSharp, IoCloseSharp } from 'react-icons/io5';
import useSearchChats from '../../hooks/useSearchChats';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { searchChats, loading } = useSearchChats();

  useEffect(() => {
    const timer = setTimeout(() => {
      searchChats(search);
    }, 300); // Затримка перед пошуком (можна змінити за потреби)

    return () => clearTimeout(timer); // Очищення таймера при зміні тексту
  }, [search, searchChats]);

  const handleClear = () => {
    setSearch('');
    searchChats(''); // Очистити результати пошуку та повернути всі чати
  };

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search…"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="button"
        className="search-button"
        onClick={handleClear}
        disabled={loading}
      >
        {search ? <IoCloseSharp className="search-icon" /> : <IoSearchSharp className="search-icon" />}
      </button>
    </form>
  );
};

export default SearchInput;
