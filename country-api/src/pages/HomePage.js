import axios from 'axios';
import { useEffect, useState } from 'react';
import { Pagination, Table } from 'react-bootstrap';

const url = `https://restcountries.com/v3.1/all`;
const countriesPerPage = 25;

function HomePage() {

    const [countries, setCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    }

    const filterdCountries = countries.filter((country) => {
        const { name, capital, region, area, population } = country;
        const query = searchQuery.toLowerCase();
        return (
            (name.common.toLowerCase().includes(query)) ||
            (capital?.[0]?.toLowerCase().includes(query)) ||
            (region.toLowerCase().includes(query)) ||
            (area.toString().includes(query)) ||
            (population.toString().includes(query))
        );
    });

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = filterdCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        axios.get(url)
            .then((res) => setCountries(res.data))
            .catch((err) => console.log(err.message));
    }, []);

    return (
        <div>
            <div className="my-3">
                <input
                    type="search"
                    className="form-control"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search Countries"
                />
            </div>
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Capital</th>
                            <th>Region</th>
                            <th>Area</th>
                            <th>Population</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentCountries.map((country) => {
                                const { name, capital, region, area, population } = country;
                                return (
                                    <tr key={name.common}>
                                        <td>{name.common}</td>
                                        <td>{capital}</td>
                                        <td>{region}</td>
                                        <td>{area}</td>
                                        <td>{population}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
            <div className="my-2">
                <Pagination>
                    {
                        Array.from({ length: Math.ceil(filterdCountries.length / countriesPerPage) })
                            .map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePagination(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))
                    }
                </Pagination>
            </div>
        </div>
    );
}

export default HomePage;
