import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO, isPast } from 'date-fns';

function Rentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('endTime');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      const response = await axios.get('http://localhost:4000/admin/rentals', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setRentals(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load rentals. Please check your connection and login status.');
      setLoading(false);
      console.error('Error fetching rentals:', err);
    }
  };

  const markAsCompleted = async (rentalId) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      await axios.patch(
        `http://localhost:4000/admin/rentals/${rentalId}/complete`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setRentals(prevRentals =>
        prevRentals.map(rental =>
          rental.id === rentalId ? { ...rental, status: 'completed' } : rental
        )
      );
      
      alert('Rental marked as completed successfully!');
    } catch (err) {
      alert('Failed to update rental status.');
      console.error('Error updating rental:', err);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedRentals = rentals
    .filter(rental => {
      const matchesSearch = 
        rental.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.id.toString().includes(searchTerm);
        
      if (filterStatus === 'all') return matchesSearch;
      if (filterStatus === 'active') return rental.status === 'active' && matchesSearch;
      if (filterStatus === 'completed') return rental.status === 'completed' && matchesSearch;
      if (filterStatus === 'unpaid') return rental.paymentStatus === 'unpaid' && matchesSearch;
      if (filterStatus === 'overdue') {
        return rental.status === 'active' && 
               isPast(parseISO(rental.endTime)) && 
               matchesSearch;
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      let valueA, valueB;
      
      switch (sortField) {
        case 'id':
          valueA = a.id;
          valueB = b.id;
          break;
        case 'user':
          valueA = a.user.firstName.toLowerCase();
          valueB = b.user.firstName.toLowerCase();
          break;
        case 'amount':
          valueA = a.amount;
          valueB = b.amount;
          break;
        case 'startTime':
          valueA = new Date(a.startTime);
          valueB = new Date(b.startTime);
          break;
        case 'endTime':
          valueA = new Date(a.endTime);
          valueB = new Date(b.endTime);
          break;
        case 'status':
          valueA = a.status;
          valueB = b.status;
          break;
        case 'paymentStatus':
          valueA = a.paymentStatus;
          valueB = b.paymentStatus;
          break;
        default:
          valueA = a[sortField];
          valueB = b[sortField];
      }
      
      if (sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

  const formatDate = (dateString) => {
    return format(parseISO(dateString), 'MMM d, yyyy h:mm a');
  };

  const isOverdue = (endTime) => {
    return isPast(parseISO(endTime));
  };

  const shouldShowCompleteButton = (rental) => {
    return rental.status === 'active' && isOverdue(rental.endTime);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Rental Management</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search by user name, email or rental ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter Status</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Rentals</option>
              <option value="active">Active Only</option>
              <option value="completed">Completed Only</option>
              <option value="unpaid">Unpaid Only</option>
              <option value="overdue">Overdue Only</option>
            </select>
          </div>
          
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={sortField}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="id">Rental ID</option>
              <option value="user">User Name</option>
              <option value="startTime">Start Time</option>
              <option value="endTime">End Time</option>
              <option value="amount">Amount</option>
              <option value="status">Status</option>
              <option value="paymentStatus">Payment Status</option>
            </select>
          </div>
          
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={fetchRentals}
          >
            Refresh Data
          </button>
          
          <span className="text-gray-600">
            {filteredAndSortedRentals.length} rentals found
          </span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-600">Loading rentals...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedRentals.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                      No rentals found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedRentals.map((rental) => (
                    <tr key={rental.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {rental.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{rental.user.firstName} {rental.user.lastName}</div>
                        <div className="text-xs text-gray-400">{rental.user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rental.vehicleId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(rental.startTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={isOverdue(rental.endTime) ? "text-red-500 font-medium" : ""}>
                          {formatDate(rental.endTime)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rental.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          rental.status === 'active' 
                            ? isOverdue(rental.endTime) ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            : rental.status === 'completed' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {rental.status === 'active' && isOverdue(rental.endTime) 
                            ? 'Overdue' 
                            : rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          rental.paymentStatus === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {rental.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {shouldShowCompleteButton(rental) && (
                          <button
                            onClick={() => markAsCompleted(rental.id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-xs"
                          >
                            Mark Completed
                          </button>
                        )}
                        <button
                          onClick={() => alert(`View details for rental #${rental.id}`)}
                          className="ml-2 text-indigo-600 hover:text-indigo-900 text-xs"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rentals;