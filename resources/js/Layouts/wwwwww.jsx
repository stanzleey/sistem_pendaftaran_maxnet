// Di bagian state, tambahkan:
const [paymentProof, setPaymentProof] = useState(null);
const [uploading, setUploading] = useState(false);

// Di bagian UI, tambahkan form upload:
{invoiceData.paymentStatus !== 'paid' && (
  <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
    {/* ... bagian sebelumnya ... */}
    
    <div className="mt-6 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h4 className="font-medium text-gray-700 mb-3">Upload Bukti Pembayaran</h4>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pilih File Bukti Transfer
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPaymentProof(e.target.files[0])}
            className="hidden"
            id="paymentProof"
          />
          <label
            htmlFor="paymentProof"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 cursor-pointer"
          >
            Pilih File
          </label>
          <span className="ml-3 text-sm text-gray-500">
            {paymentProof ? paymentProof.name : 'Belum ada file dipilih'}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Format: JPEG, PNG, JPG, GIF (maks. 2MB)
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handlePaymentProofUpload}
          disabled={!paymentProof || uploading}
          className={`px-6 py-3 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200 ${
            !paymentProof || uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mengupload...
            </span>
          ) : (
            'Upload & Konfirmasi Pembayaran'
          )}
        </button>
      </div>
    </div>
  </div>
)}

// Tambahkan fungsi handle upload:
const handlePaymentProofUpload = async () => {
  if (!paymentProof) {
    toast.error('Silakan pilih file bukti pembayaran terlebih dahulu');
    return;
  }

  setUploading(true);

  try {
    const formData = new FormData();
    formData.append('payment_proof', paymentProof);
    formData.append('_method', 'PUT'); // Untuk method PUT

    const response = await axios.post(
      `/admin/customers/${invoiceData.id}/upload-payment`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    setInvoiceData({
      ...invoiceData,
      paymentStatus: 'pending_verification',
      payment_proof: response.data.payment_proof
    });

    toast.success('Bukti pembayaran berhasil diupload! Tim kami akan memverifikasi dalam 1x24 jam.');
  } catch (error) {
    console.error('Upload error:', error);
    toast.error('Gagal mengupload bukti pembayaran. Silakan coba lagi.');
  } finally {
    setUploading(false);
  }
};