/** @format */

import React, { useEffect, useState } from 'react';
import PokeGrid from '../components/PokeGrid';

export default function Home() {
	const [input, setinput] = useState('');
	const [pokemon, setPokemon] = useState([]);
	const [index, setIndex] = useState(12);

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	const more = ()=>{
		setIndex(index + 12);
	}
	const less = ()=>{
		if(index>=12){
			setIndex(index - 12);
		}
		
	}

	useEffect(() => {
		const fetchPokemon = () => {
			const promises = [];
			for (let i = 1; i <= index; i++) {
				const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
				promises.push(fetch(url).then((res) => res.json()));
			}
			Promise.all(promises).then((results) => {
				const fetchedPokemon = results.map((result) => ({
					name: capitalizeFirstLetter(result.name),
					image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
						result.id < 10
							? '00' + result.id
							: result.id < 100
							? '0' + result.id
							: +result.id
					}.png`,
					type: result.types
						.map((type) => type.type.name),
					id: result.id,
				}));
				// console.log(fetchedPokemon);
				setPokemon(fetchedPokemon);
			});
		};
		// console.log(pokemon);
		fetchPokemon();
	}, [index]);


	return (
		<>
			<div style={{marginTop: '100px'}}>
				
				<div>
					<PokeGrid pokemon={pokemon} input={input} />
				</div>
				<div className='load-btn'>
				<button className="btn " type="button"  onClick= {less}>
					<span className="spinner-border spinner-border-sm " aria-hidden="true" style={{marginRight: '10px'}}></span>
					Load Less
				</button>
				<button className="btn " type="button" onClick= {more}>
					<span className="spinner-border spinner-border-sm active"   aria-hidden="true" style={{marginRight: '10px'}}></span>
					Load More
				</button>
				</div>
			</div>
		</>
	);
}
