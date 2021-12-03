class EstagiarioValidation{

    static isEmpyt(value){
        return (!value || typeof value == undefined || value == null);
    }

    static isMinimunCharacter(value){
        return value.length >= 3; 
    }

    static validarTamanho(value){
        return !this.isEmpyt(value) && this.isMinimunCharacter(value);
    }

    static validarNome(nome){
        return this.validarTamanho(nome);
    }

    static validarDataNascimento(dataNascimento){
        let dateFormat = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

        if(this.isEmpyt(dataNascimento) && dateFormat.test(dataNascimento)){
            return false;
        }

        let partes = dataNascimento.split('/');

        let day = parseInt(partes[0]);
        let month = parseInt(partes[1]);
        let year = parseInt(partes[2]);

        let date = new Date(`${month}/${day}/${year}`);

        if(date.valueOf().toString() === 'NaN'){
            return false;
        }

        return true;
    }

    static validarRegistroAcademico(registroAcademico){
        return this.validarTamanho(registroAcademico);
    }

    static validarCurso(curso){
        return this.validarTamanho(curso);
    }

    static validarTurno(turno){
        return this.validarTamanho(turno);
    }

    static validarCedulaDeIdentidade(cedulaDeIdentidade){
        return this.validarTamanho(cedulaDeIdentidade);
    }

    static validarCpf(cpf){

        if (this.isEmpyt(cpf)){
            return false;
        }

        let cpfArray = [];
        let i;
        let element;

        for(i = 0; i < cpf.length; i++){
            element = parseInt(cpf[i]);
            if(!(element >= 0 && element <= 9) || cpfArray.length > 11){
                return false;
            }
            cpfArray.push(element);
        }

        if(cpfArray.length < 11){
            return false;
        }

        let cpfString = cpfArray.toString().replace(/,/gi, "",);
        // Elimina CPFs invalidos conhecidos	
        if (cpfString == "00000000000" || 
            cpfString == "11111111111" || 
            cpfString == "22222222222" || 
            cpfString == "33333333333" || 
            cpfString == "44444444444" || 
            cpfString == "55555555555" || 
            cpfString == "66666666666" || 
            cpfString == "77777777777" || 
            cpfString == "88888888888" || 
            cpfString == "99999999999")
            {
                return false;
            }

        // Valida 1o digito	
        let add = 0;
        let rev;
        for (i=0; i < 9; i ++)		
            add += cpfArray[i] * (10 - i);	
            rev = 11 - (add % 11);	
            if (rev == 10 || rev == 11)	{
                rev = 0;
            }	
            if (rev != cpfArray[9]){
                return false;	
            }

        // Valida 2o digito	
        add = 0;	
        for (i = 0; i < 10; i ++)		
            add += cpfArray[i] * (11 - i);	
            rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11){
            rev = 0;
        }	
        if (rev != cpfArray[10]){
            return false;
        }	
        return true;   
    }

    static validarNacionalidade(nacionalidade){
        return this.validarTamanho(nacionalidade);
    }

    static validarEstadoCivil(estadoCivil){
        return this.validarTamanho(estadoCivil);
    }

    static validarCidade(cidade){
        return this.validarTamanho(cidade);
    }

    static validarEstado(estado){
        return this.validarTamanho(estado);
    }

    static validarCep(cep){
        return this.validarTamanho(cep);
    }

    static validarFone(fone){

        if(this.isEmpyt(fone)){
            return false;
        }

        let foneArray = [];
        let i;
        let element;

        for(i = 0; i < fone.length; i++){
            element = parseInt(fone[i]);
            if(!(element >= 0 && element <= 9) || foneArray.length > 11){
                return false;
            }
            foneArray.push(element);
        }

        if(foneArray.length < 10){
            return false;
        }

        return true;
    }

    static validarEmail(email){
        return this.validarTamanho(email) && email.indexOf("@") != -1;
    }

}

module.exports = EstagiarioValidation;