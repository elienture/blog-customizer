import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export const App = () => {
	const [ArticleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': ArticleState.fontFamilyOption.value,
					'--font-size': ArticleState.fontSizeOption.value,
					'--font-color': ArticleState.fontColor.value,
					'--container-width': ArticleState.contentWidth.value,
					'--bg-color': ArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm settings={setArticleState} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
