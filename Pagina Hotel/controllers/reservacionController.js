const db = require('../config/db');

function formatFecha(fecha) {
    // Primero, revisemos si el formato es DD/MM/YYYY
    if (fecha.includes('/')) {
        const [dia, mes, año] = fecha.split('/');
        return `${año}-${mes}-${dia}`;
    }
    // Si el formato es YYYY-MM-DD, lo dejamos sin cambios
    if (fecha.includes('-')) {
        return fecha;
    }
    // Si el formato es incorrecto, devolver un valor que ayude a depurar
    console.log("Formato de fecha desconocido:", fecha);
    return null;  // Devuelve null si el formato no es reconocido
}


exports.checkAvailability = (req, res) => {
    const { roomType, arrivalDate, departureDate } = req.body;

    // Formateamos las fechas y mostramos en consola para verificar
    const arrivalDateFormatted = formatFecha(arrivalDate);
    const departureDateFormatted = formatFecha(departureDate);
    
    console.log("Datos recibidos:");
    console.log("Tipo de habitación:", roomType);
    console.log("Fecha de llegada:", arrivalDate, " -> Formateada:", arrivalDateFormatted);
    console.log("Fecha de salida:", departureDate, " -> Formateada:", departureDateFormatted);

    // Validación de las fechas
    if (new Date(arrivalDateFormatted) >= new Date(departureDateFormatted)) {
        console.log("Error: La fecha de llegada es igual o posterior a la fecha de salida.");
        return res.status(400).json({ available: false, message: 'La fecha de llegada debe ser anterior a la de salida.' });
    }

    // Consulta SQL para verificar disponibilidad
    const query = `
        SELECT * FROM reservaciones
        JOIN habitaciones ON reservaciones.habitacion_id = habitaciones.id
        WHERE habitaciones.tipo = ?
        AND NOT (fecha_salida < ? OR fecha_llegada > ?)
    `;
    const params = [roomType, arrivalDateFormatted, departureDateFormatted];
    
    console.log("Consulta SQL a ejecutar:");
    console.log(query);
    console.log("Parámetros:", params);

    // Ejecutamos la consulta y mostramos resultados en consola
    db.query(query, params, (error, results) => {
        if (error) {
            console.error('Error al verificar disponibilidad:', error);
            return res.status(500).json({ available: false, message: 'Error al verificar disponibilidad' });
        } 
        
        console.log("Resultados de la consulta:", results);

        if (results.length > 0) {
            console.log("Resultado: Habitación no disponible en las fechas especificadas.");
            res.status(409).json({ available: false, message: 'La habitación no está disponible en esas fechas.' });
        } else {
            console.log("Resultado: Habitación disponible en las fechas especificadas.");
            res.status(200).json({ available: true, message: 'La habitación está disponible.' });
        }
    });
};



exports.makeReservation = (req, res) => {
    const { arrivalDate, departureDate, roomType, guests, nombreHuesped, emailHuesped } = req.body;

    db.query(
        'SELECT id FROM habitaciones WHERE tipo = ?',
        [roomType],
        (error, results) => {
            if (error || results.length === 0) {
                console.error('Error al obtener el ID de la habitación:', error);
                return res.status(500).json({ message: 'Error al procesar la reserva' });
            }

            const habitacionId = results[0].id;

            db.query(
                'INSERT INTO reservaciones (habitacion_id, fecha_llegada, fecha_salida, huespedes, nombre_huesped, email_huesped) VALUES (?, ?, ?, ?, ?, ?)',
                [habitacionId, arrivalDate, departureDate, guests, nombreHuesped, emailHuesped],
                (error) => {
                    if (error) {
                        console.error('Error al realizar la reserva:', error);
                        res.status(500).json({ message: 'Error al realizar la reserva' });
                    } else {
                        res.status(200).json({ message: 'Reserva realizada con éxito' });
                    }
                }
            );
        }
    );
};
