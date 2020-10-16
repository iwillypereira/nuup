export const funciones = {
    toggleLayout: (layout)=>{
        Vue.$store.commit("SET_LAYOUT", layout);
    },
}