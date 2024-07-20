import { useQuery } from '@tanstack/react-query'
import React from 'react'
import {searchData} from './query'
import { useParams } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import ColumnDisplay from '../home/ColumnDisplay'


const Search = () => {
  const { text } = useParams()
  const { data: searchAllData, isLoading: isSearching } = useQuery({
    queryKey: ["search"],
    queryFn: ()=>searchData(text),
  });

  if(isSearching || searchAllData.results.length === 0){
    return <div style={{marginTop:"100px"}}>
      <Loader/>
    </div>
  }

  return (
    <div style={{marginTop:"50px"}}> 
      {searchAllData.results.length === 0 ? <h3>No data found</h3> :<div>
        <h1>Search Results</h1>
      <ColumnDisplay data={searchAllData} displayType={"tvShow"}></ColumnDisplay>
        </div>} 
    </div>
  )
}

export default Search