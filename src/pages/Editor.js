import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';

export default function EditorPage() {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const onEditorStateChange = (editorState) => {
		setEditorState(editorState);
	};

	return (
		<Editor
			editorState={editorState}
			toolbarClassName="toolbarClassName"
			wrapperClassName="wrapperClassName"
			editorClassName="editorClassName"
			onEditorStateChange={onEditorStateChange}
		/>
	);
}