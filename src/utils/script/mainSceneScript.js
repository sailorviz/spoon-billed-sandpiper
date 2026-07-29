export function getMainSceneScript(
    narrativeState
){

    if(!narrativeState){
        return null;
    }

    switch(narrativeState.id){


        case "overview":

            return {

                map:{
                    mode:"overview"
                },

                points:{
                    mode:"all"
                },

                labels:{
                    mode:"all"
                },

                lines:{
                    mode:"show"
                },

                track:{
                    mode:"hidden"
                },

                bird:{
                    mode:"hidden"
                },

                bubble:{
                    mode:"hidden"
                }

            };



        case "migration":


            return {

                map:{
                    mode:"followBird"
                },


                points:{
                    mode:"passed"
                },


                labels:{
                    mode:"passed"
                },


                lines:{
                    mode:"hidden"
                },


                track:{
                    mode:"followBird"
                },


                bird:{
                    mode:"show"
                },


                bubble:{
                    mode:"followBird"
                }

            };


        default:

            return null;

    }

}
