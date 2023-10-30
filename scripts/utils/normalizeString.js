// Fonction pour supprimer les accents et convertir en minuscules
export const normalizeString = str => {
    return str
        .toLowerCase()
        // Enlever la ponctuation
        .replace(/[.,;:!\?\*"()°]/g, "")
        // Enlever les apostrophes
        .replace(/[']/g, " ")
        // Enlever les chiffres (200, 180, 220)
        .replace(/\b(200|180|220)\b/g, "")
        // Enlever les accents
        .normalize("NFD")
        // Enlever les caractères spéciaux
        .replace(/[\u0300-\u036f]/g, "")
};