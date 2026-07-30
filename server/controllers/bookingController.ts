import { Response } from "express"
import { AuthRequest } from "../middlewares/auth.js"
import { Restaurant222 } from "../models/Restaurant.js"
import { Booking } from "../models/Booking.js"

export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { restaurantId, date, time, guests, occasion, specialRequests } = req.body
        if (!restaurantId || !date || !time || !guests) {
            res.status(400).json({ message: 'please provide reservation details' })
            return
        }
        const restaurant = await Restaurant222.findById(restaurantId)
        if (!restaurant) {
            res.status(404).json({ message: 'restaurant not found' })
            return
        }
        if (restaurant.status !== 'approved') {
            res.status(400).json({ message: 'no reservation open for this restaurant' })
            return
        }
        const requestedGuests = Number(guests)
        const existingBookings = await Booking.find({
            restaurant: restaurantId,
            date: new Date(date),
            time,
            status: 'confirmed'
        })
        const bookedSeats = existingBookings.reduce((sum, b) => sum + b.guests, 0)
        const totalSeats = restaurant.totalSeats || 20
        const availableSeats = totalSeats - bookedSeats
        if (requestedGuests > availableSeats) {
            res.status(400).json({
                message: `unable to reserve only${availableSeats} seats are available`
            })
        }
        const booking = await Booking.create({
            user: req.user?._id,
            restaurant: restaurantId,
            date: new Date(date),
            time,
            guests: Number(guests),
            occasion,
            specialRequests,
            status: 'confirmed',
        })
        // const populatedBooking = await booking.populate('name location image address')
        const populatedBooking = await booking.populate(['restaurant', 'name location image address'])
        res.status(201).json(populatedBooking)

    } catch (error: any) {
        console.error(error)
        res.status(400).json({ message: error.message })
    }
}
export const getMyBookings = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const bookings = await Booking.find({ user: req.user?._id }).populate('restaurant', 'name location image adddress slug').sort({ date: -1, time: -1 })
        // const bookings = await Booking.find({ user: req.user?._id }).populate('restaurant', 'name location image adddress slug').sort({ date: -1, time: -1 })
        res.json(bookings)
    } catch (error: any) {
        console.error(error)
        res.status(400).json({ message: error.message })
    }
}
export const cancelBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const booking = await Booking.findById(req.params.id)
        if (!booking) {
            res.status(404).json({ message: 'booking not found' })
            return
        }
        if (booking.user.toString() !== req.user?._id.toString()) {
            res.status(404).json({ message: 'booking not found' })
            return
        }
        booking.status = 'cancelled'
        await booking.save()
        const populatedBooking = await booking.populate('restaurant', 'name location image address')
        res.json(populatedBooking)
    } catch (error: any) {
        console.error(error)
        res.status(400).json({ message: error.message })
    }
}