import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

fastify.get('/healthcheck', async function () {
    return {status:'okay'}

})

async function main() {

        await fastify.listen({ port: 3000 }, function (err, address) {
            if (err) {
                fastify.log.error(err)
                process.exit(1)
            } else {
                console.log('server running at http://localhost:3000')
            }
        })
        
}

main()