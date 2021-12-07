function calcularDiasTrabalhados(dataInicio, dataAtual)
{
    
    let qtdDias = 0;
    let inicio = new Date(dataInicio);
    let atual = new Date(dataAtual);
    
    let dataDiaSeguinte = atual;
    dataDiaSeguinte.setDate(dataDiaSeguinte.getDate() + 1);

    console.log(dataDiaSeguinte);
    

    while(Date.parse(inicio) < Date.parse(dataDiaSeguinte)){

        if(inicio.getDay() != 0 && inicio.getDay() != 6){
            qtdDias++;
        }

        inicio.setDate(inicio.getDate() + 1);
    }

    return qtdDias;
}

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