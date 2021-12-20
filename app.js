new Vue({


    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []

    },
    computed: {

        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }

    },
    methods: {
        startGame() {
            this.running = true
            this.playerLife = 100;
            this.monsterLife = 100;
            this.logs = []
        },
        attack(skill) {
            console.log(skill)
            this.hurt('playerLife', 7, 12, false, 'Monster', 'Player', 'Monster')
            if (this.monsterLife > 0) {
                this.hurt('monsterLife', 5, 10, skill, 'Player', 'Monster', 'Player')
            }
        },
        hurt(character, max, min, skill, source, target, cls) {
            const plus = skill ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[character] = Math.max(this[character] - hurt, 0)
            this.registerLogs(`- ${source}: attacked ${target} with ${hurt} damage.`, cls)
        },

        healAndHurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Player', 'Monster')
        },
        heal(max, min) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLogs(`- Potion Heal ${heal}HP`, 'Player')
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLogs(text, cls) {
            this.logs.unshift({ text, cls })
        }
    },
    watch: {
        hasResult(value) {
            if (value) { this.running = false }
        }
    }












})