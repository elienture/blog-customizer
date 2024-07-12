import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, FormEvent, useRef, useEffect } from 'react';

export type ArticleParamsFormProps = {
	settings: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ settings }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
	const ref = useRef<HTMLFormElement | null>(null);

	// закрытие формы 
	useEffect(() => {
		if (!isMenuOpen) return;

		function closeSide(event: KeyboardEvent) {
			if (event.key === 'Enter') {
				setIsMenuOpen(false);
			}
		}
		function closeSideClick(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		}

		document.addEventListener('keydown', closeSide);
		document.addEventListener('mousedown', closeSideClick);

		return () => {
			document.removeEventListener('keydown', closeSide);
			document.removeEventListener('mousedown', closeSideClick);
		};
	}, [isMenuOpen]);

	// отправка формы
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		settings(formState);
	};


	// ресет формы
	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		settings(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				sideState={isMenuOpen}
				clickOpen={() => setIsMenuOpen((currentIsOpened) => !currentIsOpened)}
			/>
			<div
				onClick={() => setIsMenuOpen(false)}
				className={clsx(styles.overlay, isMenuOpen && styles.overlay_open)}></div>

			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}
					ref={ref}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) =>
							setFormState((state) => ({
								...state,
								fontFamilyOption: selected,
							}))
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected) =>
							setFormState((state) => ({
								...state,
								fontSizeOption: selected,
							}))
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selected) =>
							setFormState((state) => ({ ...state, fontColor: selected }))
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selected) =>
							setFormState((state) => ({
								...state,
								backgroundColor: selected,
							}))
						}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selected) =>
							setFormState((state) => ({
								...state,
								contentWidth: selected,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
