const Phone = require('../models/phone')
const stripe = require('../system-config')

const getPhones = async (req, res) => {
    try {
        const phones = await Phone.find()

        res.status(200).json(phones)
    } catch (e) {
        console.log(e)
    }
}

const buyPhone = async (req, res) => {
    try {
        const { id } = req.params
        const { quantity = 1 } = req.body

        const phone = await Phone.findById(id)

        if (!phone) return

        const stripe = require('stripe')('sk_test_51MotDXEzIzmyz1vDBT9nYVpeSqa23fa7gfcNtzJxJPFd3FyThlcy8KCVg5ZqkzwcaDc6xzn2jIbHefHuwwXZOsEr001FaFJ2P3')

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'amd',
                        product_data: {
                            name: phone.name,
                            images: [phone.image]
                        },
                        unit_amount: phone.price * 100,
                    },
                    quantity: quantity,
                }
            ],
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000`,
        })

        res.json({ url: session.url })
    } catch (e) {
        console.log(e)
    }
}

module.exports = { getPhones, buyPhone }