import { Language } from '@/types/apiTypesFromEnums';
import { FormControl, NativeSelect, OutlinedInput } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';

export type LanguageOption = {
  name: string;
  id: Language;
};

export const ProgrammingLanguage = ({ languageOptions }: { languageOptions: LanguageOption[] }) => {
  const [language, setLanguage] = useState(languageOptions[0]);

  const onChangeLanguage: ChangeEventHandler<HTMLSelectElement> = (ev) => {
    console.log(ev.target.value);
    const newlanguage = languageOptions.find(({ id }) => id === ev.target.value);
    setLanguage(newlanguage);
  };

  return (
    <FormControl sx={{}} size='small' color='secondary' variant='outlined'>
      <NativeSelect
        color='secondary'
        variant='outlined'
        defaultValue={language.id}
        inputProps={{ name: 'language' }}
        input={<OutlinedInput />}
        onChange={onChangeLanguage}
      >
        {languageOptions.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
