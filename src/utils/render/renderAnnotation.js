export function renderAnnotation(
    scene,
    command,
    language,
    narrative
){

    if (
        !scene ||
        !language ||
        !narrative
    ) {
        return;
    }


    if(!command){

        scene.hide();

        return;

    }

    const text =
        command
            ? narrative[language]?.[command.key]
            : null;


    scene.setText(text);

}