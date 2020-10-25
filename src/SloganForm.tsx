import React, {useState}  from 'react';

type SloganFormProps = { 
    handleAddSlogan: any
}

const SloganForm = ({handleAddSlogan}: SloganFormProps) => {
    const [addSloganText, setAddSloganText] = useState('');

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (!addSloganText.length) {
            return;
        }
        
        handleAddSlogan(addSloganText);
    }

    return (
        <form className="AppForm" onSubmit={handleSubmit}>
            <label htmlFor="newSlogan">
                add slogan ⇒
            </label>
            <input
                id="newSlogan"
                onChange={(e) => {setAddSloganText(e.target.value)}}
                value={addSloganText}
            />
            <button title="Add slogan">✚</button>
        </form>
    );
}
  
export default SloganForm;