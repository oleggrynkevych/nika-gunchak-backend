const slugify = strapi.plugins['slugify'];

const transliterationMap = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "yo", "ж": "zh", "з": "z", "и": "i", "й": "y", "к": "k",
    "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f", "х": "h", "ц": "ts",
    "ч": "ch", "ш": "sh", "щ": "shch", "ъ": "i", "ы": "y", "ь": "i", "э": "e", "ю": "yu", "я": "ya", "і": "i", "є": "ye",
    "ї": "yi", "ґ": "g"
};

function generateSlug(inputString) {
    const normalizedString = inputString
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const slug = normalizedString
        .split("")
        .map(char => transliterationMap[char] || char)
        .join("")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .replace(/(^-+|-+$)/g, "") // Remove leading/trailing hyphens
        .replace(/-{2,}/g, "-"); // Replace consecutive hyphens with a single hyphen

    return slug;
}

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (data.Title) {
        data.slug = generateSlug(data.Title);
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    if (data.Title) {
        data.slug = generateSlug(data.Title);
    }
  },
};

