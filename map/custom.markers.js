/*
Custom markers for the Void Spell Dream Realm map.
Zone labels + completion status are hand-maintained; coordinates come from the mod:
DreamRealmRegions (region layout), ForgottenShoreMath (crater rings), SchematicPlacements
(Crimson Spire / Soul Tree), CitadelConfig + the server's placement logs (citadel gates,
outposts), ChainedIslesMath (isle field / central isle).
*/

UnminedCustomMarkers = {

    isEnabled: true,

    markers: [

        // ================= FORGOTTEN SHORE (complete) =================
        {
            x: 0, z: -5750,
            text: "FORGOTTEN SHORE",
            textColor: "#e6edf3",
            offsetX: 0, offsetY: 0,
            font: "bold 30px 'Segoe UI',sans-serif",
        },
        {
            x: 0, z: -5750,
            text: "COMPLETE",
            textColor: "#2ecc71",
            offsetX: 0, offsetY: 24,
            font: "bold 15px 'Segoe UI',sans-serif",
        },
        {
            x: 0, z: 0,
            text: "Dark Sea",
            textColor: "#7f9dc9",
            offsetX: 0, offsetY: 0,
            font: "bold 18px 'Segoe UI',sans-serif",
        },
        {
            x: 0, z: 3400,
            text: "Crimson Labyrinth",
            textColor: "#d98a80",
            offsetX: 0, offsetY: 0,
            font: "bold 18px 'Segoe UI',sans-serif",
        },
        {
            x: 2500, z: -750,
            text: "Ashen Barrow",
            textColor: "#b8a68f",
            offsetX: 0, offsetY: 0,
            font: "bold 15px 'Segoe UI',sans-serif",
        },
        {
            x: 2500, z: 60,
            text: "✦ Soul Tree",
            textColor: "#d4af37",
            offsetX: 0, offsetY: 14,
            font: "bold 13px 'Segoe UI',sans-serif",
        },
        {
            x: -3900, z: 60,
            text: "✦ Crimson Spire",
            textColor: "#e74c3c",
            offsetX: 0, offsetY: 14,
            font: "bold 13px 'Segoe UI',sans-serif",
        },
        {
            x: -1500, z: 260,
            text: "arrival beach",
            textColor: "#80e5ff",
            offsetX: 0, offsetY: 0,
            font: "italic 12px 'Segoe UI',sans-serif",
        },

        // ================= HOLLOW MOUNTAINS (in progress) =================
        {
            x: 5500, z: 5500,
            text: "HOLLOW MOUNTAINS",
            textColor: "#cfd9e4",
            offsetX: 0, offsetY: 0,
            font: "bold 26px 'Segoe UI',sans-serif",
        },
        {
            x: 5500, z: 5500,
            text: "IN PROGRESS — impassable wall, terrain only",
            textColor: "#f0a53c",
            offsetX: 0, offsetY: 22,
            font: "bold 14px 'Segoe UI',sans-serif",
        },

        // ================= CHAINED ISLES (complete) =================
        {
            x: 13500, z: 5250,
            text: "CHAINED ISLES",
            textColor: "#e6edf3",
            offsetX: 0, offsetY: 0,
            font: "bold 30px 'Segoe UI',sans-serif",
        },
        {
            x: 13500, z: 5250,
            text: "COMPLETE",
            textColor: "#2ecc71",
            offsetX: 0, offsetY: 24,
            font: "bold 15px 'Segoe UI',sans-serif",
        },
        {
            x: 15000, z: 15250,
            text: "Central Isle · arrival",
            textColor: "#80e5ff",
            offsetX: 0, offsetY: 0,
            font: "bold 13px 'Segoe UI',sans-serif",
        },

        // ================= DREAM BARRENS (planned) =================
        {
            x: -3800, z: 10500,
            text: "DREAM BARRENS — NOT YET BUILT",
            textColor: "#5a6472",
            offsetX: 0, offsetY: 0,
            font: "italic bold 20px 'Segoe UI',sans-serif",
        },
        {
            x: -4200, z: 11200,
            text: "Godgrave — planned",
            textColor: "#4d5666",
            offsetX: 0, offsetY: 0,
            font: "italic 14px 'Segoe UI',sans-serif",
        },
        {
            x: 12000, z: -5900,
            text: "DREAM BARRENS — NOT YET BUILT",
            textColor: "#5a6472",
            offsetX: 0, offsetY: 0,
            font: "italic bold 20px 'Segoe UI',sans-serif",
        },
        {
            x: 11500, z: -5200,
            text: "Nightmare Desert — planned",
            textColor: "#4d5666",
            offsetX: 0, offsetY: 0,
            font: "italic 14px 'Segoe UI',sans-serif",
        },

        // ================= CITADEL GATES =================
        { x: -3895, z: 0,     text: "◆", textColor: "#80e5ff", offsetX: 0, offsetY: 0, font: "bold 16px 'Segoe UI',sans-serif" },
        { x: 2740,  z: -1930, text: "◆ Labyrinth Citadel", textColor: "#80e5ff", offsetX: 0, offsetY: 14, font: "bold 13px 'Segoe UI',sans-serif" },
        { x: -1240, z: 1610,  text: "◆ Shore Citadel", textColor: "#80e5ff", offsetX: 0, offsetY: 14, font: "bold 13px 'Segoe UI',sans-serif" },
        { x: 18049, z: 8877,  text: "◆ Isles Citadel", textColor: "#80e5ff", offsetX: 0, offsetY: 14, font: "bold 13px 'Segoe UI',sans-serif" },
        { x: 14971, z: 12143, text: "◆ Isles Citadel", textColor: "#80e5ff", offsetX: 0, offsetY: 14, font: "bold 13px 'Segoe UI',sans-serif" },
        { x: 18139, z: 14850, text: "◆ Isles Citadel", textColor: "#80e5ff", offsetX: 0, offsetY: 14, font: "bold 13px 'Segoe UI',sans-serif" },

        // ================= OUTPOSTS (shore) =================
        { x: 1910,  z: 200,   text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: 1175,  z: 1260,  text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: -515,  z: 1790,  text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: -1390, z: 905,   text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: -1630, z: -960,  text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: -470,  z: -1685, text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: 1375,  z: -1355, text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: 2705,  z: 1010,  text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: 505,   z: 3030,  text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: -1650, z: 2400,  text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: -3115, z: -385,  text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: -1965, z: -2185, text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: 960,   z: -2950, text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: 2420,  z: -1540, text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: 3550,  z: 2395,  text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: 425,   z: 4060,  text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: -3770, z: 1960,  text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: -3510, z: -2505, text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: -250,  z: -4120, text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },
        { x: 3995,  z: -1695, text: "▪", textColor: "#d4af37", offsetX: 0, offsetY: 0, font: "bold 14px 'Segoe UI',sans-serif" },

        // do not delete the following two closing brackets
    ]
}
