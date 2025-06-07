import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Button } from 'shared/ui';

interface FileUploadProps {
	label: string;
	onChange: (files: File[]) => void;
	error?: string;
	maxFiles?: number;
	accept?: string;
}

export const FileUpload = ({
	label,
	onChange,
	error,
	maxFiles = 3,
	accept = 'image/*',
}: FileUploadProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 МБ

	useEffect(() => {
		return () => {
			selectedFiles.forEach((file) =>
				URL.revokeObjectURL(URL.createObjectURL(file)),
			);
		};
	}, [selectedFiles]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || [])
			.filter(
				(file) => file.type.startsWith('image/') && file.size <= MAX_FILE_SIZE,
			)
			.slice(0, maxFiles);

		setSelectedFiles(files);
		onChange(files);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleRemoveFile = (index: number) => {
		const updatedFiles = selectedFiles.filter((_, i) => i !== index);
		setSelectedFiles(updatedFiles);
		onChange(updatedFiles);
	};

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<Box sx={{ mb: 2 }}>
			<Typography variant="body1" mb={1}>
				{label}
			</Typography>
			<input
				type="file"
				accept={accept}
				multiple
				ref={fileInputRef}
				onChange={handleFileChange}
				style={{ display: 'none' }}
				data-testid="file-input"
			/>
			<Button
				label={selectedFiles.length > 0 ? 'Изменить файлы' : 'Загрузить файлы'}
				onClick={handleButtonClick}
				sx={{ mb: 1, mr: 1 }}
			/>

			{selectedFiles.length > 0 && (
				<Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
					{selectedFiles.map((file, index) => (
						<Box
							key={index}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<img
								src={URL.createObjectURL(file)}
								alt={`Preview ${file.name}`}
								style={{
									width: '80px',
									height: '80px',
									objectFit: 'cover',
									borderRadius: '4px',
								}}
							/>
							<Typography
								variant="body2"
								sx={{
									mt: 0.5,
									maxWidth: '80px',
									textOverflow: 'ellipsis',
									overflow: 'hidden',
								}}
							>
								{file.name}
							</Typography>
							<Button
								label="Удалить"
								onClick={() => handleRemoveFile(index)}
								sx={{ mt: 0.5, color: 'error.main', fontSize: '0.75rem' }}
							/>
						</Box>
					))}
				</Box>
			)}

			{selectedFiles.length > 0 && selectedFiles.length < 3 && (
				<Typography variant="caption" color="warning.main" sx={{ mt: 1 }}>
					Пожалуйста, загрузите ровно 3 фотографии
				</Typography>
			)}

			{error && (
				<Typography variant="caption" color="error" sx={{ mt: 1 }}>
					{error}
				</Typography>
			)}
		</Box>
	);
};
