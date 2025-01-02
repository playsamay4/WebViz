var previousFitText = "";
export var singleLineYoffset = 0;



export async function fitTextToWidth(textObject, maxWidth, originalFontSize)
{
   //promise
   return new Promise(resolve => { 

        singleLineYoffset = 0;

        // Reset the font size to the original size
        textObject.style.fontSize = originalFontSize;
        
        // Reduce font size until the text fits within the maxWidth
        while (textObject.width > maxWidth && textObject.style.fontSize > 1) {
            textObject.style.fontSize--;
        }

        //the text object is now the correct size, but we need to adjust the y position to center it
        singleLineYoffset = (130 - textObject.height) / 2;


        //return the y offset
        resolve(true);
    });
}

export async function fitTextToWidthHeadline(textObject, maxWidth, originalFontSize)
{
    return new Promise(resolve => {
        singleLineYoffset = 0;

        // Reset the font size to the original size
        textObject.style.fontSize = originalFontSize;
        
        // Reduce font size until the text fits within the maxWidth
        while (textObject.width > maxWidth && textObject.style.fontSize > 1) {
            textObject.style.fontSize--;
        }

        //the text object is now the correct size, but we need to adjust the y position to center it
        singleLineYoffset = (130 - textObject.height) / 2;


        //return the y offset
        resolve(true);
    });
}

