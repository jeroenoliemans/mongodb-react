import React, {useState, MouseEvent} from 'react';

type SloganProps = {
    slogan: string, 
    dbId: number, 
    handleSloganRemove: any, 
    handleSaveSlogan: any
}

const Slogan = ({ 
    slogan, 
    dbId, 
    handleSloganRemove, 
    handleSaveSlogan
}: SloganProps) => {
    const [sloganText, setSloganText] = useState<string>(slogan);
    const [edit, setEdit] = useState<boolean>(false);

    const handleRemove = (dbId: number) : void => {
        handleSloganRemove(dbId);
    };

    const saveSlogan = (dbId : number) : void => {
        handleSaveSlogan(dbId, sloganText);
        setEdit(false);
    };

    return (
        <React.Fragment>
            {edit ? (
                <div className="Slogan">
                    <input
                        id="editSlogan"
                        className="SloganInput"
                        onChange={(e) => {setSloganText(e.target.value)}}
                        value={sloganText}
                    />
                    <div className="SloganButtons">
                        <button title="save slogan" onClick={() => saveSlogan(dbId)}>
                            <span arial-label="update" role="img">⇅</span>
                        </button>
                        <button title="cancel" onClick={() => {setEdit(false)}}>
                            <span arial-label="cancel" role="img">↶</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="Slogan">
                    <p>{sloganText}</p>
                    <div className="SloganButtons">
                        <button title="edit slogan" onClick={(e: MouseEvent) => {setEdit(true)}}>✎</button>
                        <button title="remove slogan" onClick={() => handleRemove(dbId)}>
                            <span arial-label="remove" role="img">❌</span>
                        </button>
                    </div>
                </div>
            )}     
        </React.Fragment>
    );
}
  
export default Slogan;