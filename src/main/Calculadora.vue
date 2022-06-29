<template>
  <div class="calculadora">
    <DisplayItem :value="displayValue"/>
    <ButtonItem label="AC" triple @onClick="clearMemory"/>
    <ButtonItem label="/" operation @onClick="setOperation"/>
    <ButtonItem label="7" @onClick="addDigito"/>
    <ButtonItem label="8" @onClick="addDigito"/>
    <ButtonItem label="9" @onClick="addDigito"/>
    <ButtonItem label="*" operation @onClick="setOperation"/>
    <ButtonItem label="4" @onClick="addDigito"/>
    <ButtonItem label="5" @onClick="addDigito"/>
    <ButtonItem label="6" @onClick="addDigito"/>
    <ButtonItem label="-" operation @onClick="setOperation"/>
    <ButtonItem label="1" @onClick="addDigito"/>
    <ButtonItem label="2" @onClick="addDigito"/>
    <ButtonItem label="3" @onClick="addDigito"/>
    <ButtonItem label="+" operation @onClick="setOperation"/>
    <ButtonItem label="0" double @onClick="addDigito"/>
    <ButtonItem label="." @onClick="addDigito"/>
    <ButtonItem label="=" operation @onClick="setOperation"/>

  </div>
</template>

<script>
import DisplayItem from '../components/Display.vue'
import ButtonItem from '../components/Button.vue'
export default {
    name: 'CalculadoraItem',
    data: function() {
      return {
        displayValue: "0",
        clearDisplay: false,
        operation: null,
        values: [0, 0],
        current: 0
      }
    },
    components: { ButtonItem, DisplayItem },
    methods: {
      clearMemory() {
        Object.assign(this.$data, this.$options.data())
      },
      setOperation(operation) {
        //primeira vez ao setar operação
        if (this.current === 0) {
          this.operation = operation
          //proximo valor a ser armazenado para calculo
          this.current = 1
          this.clearDisplay = true
        } else {
          const equals = operation === '='
          const currentOperation = this.operation

          try {
            //calculando a interpolação dos dados inseridos, com o eval
            //atribuindo a values[0] primeira posição
            this.values[0] = eval(
              `${this.values[0]} ${currentOperation} ${this.values[1]}`
            )
            if (isNaN(this.values[0]) || !isFinite(this.values[0])) {
              this.clearMemory()
              return
            }
          } catch (e) {
            this.$emit('onError', e)
          }
         
          // zerando o values[1] segunda posição para proximo calc
          this.values[1] = 0

          //colocando no display
          this.displayValue = this.values[0]

          this.operation = equals ? null : operation

          this.current = equals ? 0 : 1
          this.clearDisplay = !equals
        }
      },
      addDigito(n) {
        if (n === '.' && this.displayValue.includes('.')) {
          return
        }
        const clearDisplay = this.displayValue === "0"
          || this.clearDisplay
        const currentValue = clearDisplay ? "" : this.displayValue
        const newDisplayValue = currentValue + n

        this.displayValue = newDisplayValue
        this.clearDisplay = false
        this.values[this.current] = newDisplayValue

        //cód abaixo trata com parse float a string do display que é string só apra exibição. o prof optou por deixar apenas o eval
        //pois ele já trata isso
       // if (n !== '.') {
        //   const i = this.current
        //   const newValue = parseFloat(this.displayValue)
        //   this.values[i] = newValue
        // }

      }
    }
}
</script>

<style>
.calculadora
{
    height: 320px;
    width: 235px;
    border-radius: 5px;
    overflow: hidden;

    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-auto-rows: 1fr 48px 48px 48px 48px 48px;
}
</style>