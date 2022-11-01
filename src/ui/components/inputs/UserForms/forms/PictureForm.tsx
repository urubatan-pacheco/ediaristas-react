import { useFormContext, Controller } from 'react-hook-form';
import FileField from '../../FileField/FileField';
import { PictureSelection } from '../UserForms.style';

export const PictureForm = () => {
    const { control } = useFormContext();
    return (
        <PictureSelection>
            <Controller
                name={'usuario.foto_documento'}
                defaultValue={''}
                control={control}
                render={({ field }) => (
                    <FileField
                        onChange={(files) => field.onChange(files[0])}
                        inputProps={{ accept: '.jpep, .jpg, .png' }}
                    />
                )}
            />
        </PictureSelection>
    );
};
