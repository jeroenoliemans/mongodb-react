import React, {useState, useEffect} from 'react';
import services  from './services';
import SloganList from './SloganList';
import SloganForm from './SloganForm';

const App = () => {
    const [slogans, setSlogans] = useState<any>([]);

    const getSlogans = () => {
        services.getSlogans()
        .then((response: any) => {
            let responseObject = JSON.parse(response);
            setSlogans(responseObject.data);   
        }, (error: any) => {
            console.log(error)
        });
    }
    
    const addSlogan = (sloganText: string) => {
        services.addSlogan(sloganText)
        .then((response: any) => {
            console.log(response);
            getSlogans();
        }, (error: any) => {
            console.log(error)
        });
    };

    const removeSlogan = (dbId: number) => {
        console.log(dbId)
        services.deleteSlogan(dbId)
        .then((response: any) => {
            console.log(response);
            getSlogans();
        }, (error: any) => {
            console.log(error)
        });
    }

    const saveSlogan = (dbId: number, newSloganText: string) => {
        console.log(dbId, newSloganText);
        services.updateSlogan(dbId, newSloganText)
        .then((response: any) => {
            console.log('update done')
            console.log(response);
            getSlogans();
        }, (error: any) => {
            console.log(error)
        });
    }

    useEffect(() => {
        getSlogans();
    }, []);

    return (
        <React.Fragment>
            <header className="AppHeader">
                <h1>Slogans</h1>
                <SloganForm handleAddSlogan={addSlogan} />
            </header>
            <SloganList 
                handleSlogansRemove={removeSlogan}
                handleSloganUpdate={saveSlogan} 
                slogans={slogans} />
        </React.Fragment>
    );
}
  
export default App;