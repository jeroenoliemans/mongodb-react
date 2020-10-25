import React from 'react';
import Slogan from './Slogan';

interface Slogan
{
    id: number, 
    slogan: string
}

type SloganListProps = {
    slogans: Slogan[], 
    handleSlogansRemove: (handleSlogansRemove:number) => void,
    handleSloganUpdate: (handleSloganUpdate:number, newSloganText:string) => void 
}

const SloganList = ({ 
    slogans, 
    handleSlogansRemove,
    handleSloganUpdate 
}: SloganListProps) => {
    const listSlogansComponents = slogans.map((slogan, index) => 
            <Slogan 
                handleSloganRemove={handleSlogansRemove}
                handleSaveSlogan={handleSloganUpdate} 
                key={slogan.id} 
                dbId={slogan.id} 
                slogan={slogan.slogan} />
     );

    console.log(listSlogansComponents);

    return (
        <section className="Slogans">{listSlogansComponents}</section>
    );
}
  
export default SloganList;