
/*
função que calculcula quantos dias se passaram, começando de uma data especifica 
e indo até a data atual no momento em  que a função foi chamada. A função 
disconsidera os finais de semana.

Função recebe uma string representando a dada e no formato dd/mm/AAAA.
*/
function calcularDiasTrabalhados(dataInicial)
{

    let dataFinal = Date.now();
    dataFinal = new Date(dataFinal);

    /* Passa a data recebida para o formato mm/dd/AAAA. */
    let partes = dataInicial.toJSON().split('-');

    let day = parseInt(partes[1]);
    let month = parseInt(`${partes[2][0] + partes[2][1]}`);
    let year = parseInt(partes[0]);

    dataInicial = new Date(`${month}/${day}/${year}`);
    ////////

    /* Cria um novo objeto Date para a data atual, desconsiderando as horas.*/
    partes = dataFinal.toJSON().split('-');

    day = parseInt(`${partes[2][0] + partes[2][1]}`);
    month = parseInt(partes[1]);
    year = parseInt(partes[0]);

    dataFinal = new Date(`${month}/${day}/${year}`);
    ///////


    let qtdDias = 0;
    let inicio = new Date(dataInicial);
    let atual = new Date(dataFinal);
    
    let dataDiaSeguinte = atual;
    dataDiaSeguinte.setDate(dataDiaSeguinte.getDate() + 1);

    while(Date.parse(inicio) < Date.parse(dataDiaSeguinte)){

        if(inicio.getDay() != 0 && inicio.getDay() != 6){
            qtdDias++;
        }

        inicio.setDate(inicio.getDate() + 1);
    }

    return qtdDias;
}


//Restante das funções foram feitas antes do programa e precisam ser modificadas.

function calcularHorasTrabalhadas(dataInicio, dataAtual, horasDiarias){

    let qtdDias = calcularDiasTrabalhados(dataInicio, dataAtual);

    return qtdDias*horasDiarias;
}

function calcularHorasRestantes(dataInicio, dataAtual, horasDiarias, horasTotaisNecessarias){
    let horasTrabalhadas = calcularHorasTrabalhadas(dataInicio, dataAtual, horasDiarias);
    return horasTotaisNecessarias - horasTrabalhadas;
}

function calcularDiasRestantes(dataAtual, horasDiarias, horasRestantes){
    let diasRestantes = 0;
    let atual = new Date(dataAtual);
    let dataDiaSeguinte = atual;

    dataDiaSeguinte.setDate(dataDiaSeguinte.getDate() + 1);

    while(horasRestantes > 0){
    
        if(dataDiaSeguinte.getDay() != 0 && dataDiaSeguinte.getDay() != 6){
            diasRestantes++;
            horasRestantes = horasRestantes - horasDiarias;
        }
    
        console.log(horasRestantes);
    
        dataDiaSeguinte.setDate(dataDiaSeguinte.getDate() + 1);
    }

    return diasRestantes;
}

function calcularDataTermino(dataAtual, diasRestantes){

    let atual = new Date(dataAtual);
    let dataDiaSeguinte = atual;

    dataDiaSeguinte.setDate(dataDiaSeguinte.getDate() + 1);

    while(diasRestantes > 0){ // > 1 se quiser saber o ultimo dia de trabalho

        if(dataDiaSeguinte.getDay() != 0 && dataDiaSeguinte.getDay() != 6){
            diasRestantes--;
        }

        dataDiaSeguinte.setDate(dataDiaSeguinte.getDate() + 1);
    }

    return dataDiaSeguinte;
}

exports.calcularDiasTrabalhados = calcularDiasTrabalhados;
exports.calcularHorasTrabalhadas = calcularHorasTrabalhadas;
exports.calcularHorasRestantes = calcularHorasRestantes;
exports.calcularDiasRestantes = calcularDiasRestantes;
exports.calcularDataTermino = calcularDataTermino;