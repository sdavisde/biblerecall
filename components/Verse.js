import React, { useState } from 'react';

export default function Verse ({ book, chapter, verse, text }) {

    return (
        <h3>{book} - {chapter} - {verse} - {text}</h3>
	);
}