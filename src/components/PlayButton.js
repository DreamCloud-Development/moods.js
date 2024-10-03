import React from "react";

function PlayButton() {
    return (
    <select data-choose-theme className="select select-sm select-bordered">
        <option value="cupcake">🌞</option>
        <option value="coffee">🌚</option>
    </select>
    );
}

export default PlayButton;