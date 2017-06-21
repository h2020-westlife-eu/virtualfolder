using System;
using System.Security.Cryptography;
using System.Text;

namespace MetadataService.Services.Settings
{
    /// <summary>
    ///     Generates a hash for the given plain text value and returns a
    ///     base64-encoded result. Before the hash is computed, a random salt
    ///     is generated and appended to the plain text. This salt is stored at
    ///     the end of the hash value, so it can be used later for hash
    ///     verification.
    /// </summary>
    /// <param name="plainText">
    ///     Plaintext value to be hashed. The function does not check whether
    ///     this parameter is null.
    /// </param>
    /// <param name="saltBytes">
    ///     Salt bytes. This parameter can be null, in which case a random salt
    ///     value will be generated.
    /// </param>
    /// <returns>
    ///     Hash value formatted as a base64-encoded string.
    /// </returns>
    /// derived from http://www.obviex.com/samples/hash.aspx
    public class SimpleHash
    {
        public static string ComputeHash(string plainText,
            byte[] saltBytes = null)
        {
            // If salt is not specified, generate it on the fly.
            if (saltBytes == null)
            {
                // Generate a random number for the size of the salt.
                var random = new Random();
                var saltSize = random.Next(4, 8);

                // Allocate a byte array, which will hold the salt.
                saltBytes = new byte[saltSize];

                // Initialize a random number generator.
                var rng = new RNGCryptoServiceProvider();

                // Fill the salt with cryptographically strong byte values.
                rng.GetNonZeroBytes(saltBytes);
            }

            // Convert plain text into a byte array.
            var plainTextBytes = Encoding.UTF8.GetBytes(plainText);

            // Allocate array, which will hold plain text and salt.
            var plainTextWithSaltBytes =
                new byte[plainTextBytes.Length + saltBytes.Length];

            // Copy plain text bytes into resulting array.
            for (var i = 0; i < plainTextBytes.Length; i++)
                plainTextWithSaltBytes[i] = plainTextBytes[i];

            // Append salt bytes to the resulting array.
            for (var i = 0; i < saltBytes.Length; i++)
                plainTextWithSaltBytes[plainTextBytes.Length + i] = saltBytes[i];

            // Because we support multiple hashing algorithms, we must define
            // hash object as a common (abstract) base class. We will specify the
            // actual hashing algorithm class later during object creation.
            HashAlgorithm hash = new SHA512Managed();
            // hash = new SHA1Managed();
            // hash = new SHA256Managed();
            // hash = new SHA384Managed();
            // hash = new MD5CryptoServiceProvider();

            // Compute hash value of our plain text with appended salt.
            var hashBytes = hash.ComputeHash(plainTextWithSaltBytes);

            // Create array which will hold hash and original salt bytes.
            var hashWithSaltBytes = new byte[hashBytes.Length +
                                             saltBytes.Length];

            // Copy hash bytes into resulting array.
            for (var i = 0; i < hashBytes.Length; i++)
                hashWithSaltBytes[i] = hashBytes[i];

            // Append salt bytes to the result.
            for (var i = 0; i < saltBytes.Length; i++)
                hashWithSaltBytes[hashBytes.Length + i] = saltBytes[i];

            // Convert result into a base64-encoded string.
            var hashValue = Convert.ToBase64String(hashWithSaltBytes);

            // Return the result.
            return hashValue;
        }

        /// <summary>
        ///     Compares a hash of the specified plain text value to a given hash
        ///     value. Plain text is hashed with the same salt value as the original
        ///     hash.
        /// </summary>
        /// <param name="plainText">
        ///     Plain text to be verified against the specified hash. The function
        ///     does not check whether this parameter is null.
        /// </param>
        /// <param name="hashValue">
        ///     Base64-encoded hash value produced by ComputeHash function. This value
        ///     includes the original salt appended to it.
        /// </param>
        /// <returns>
        ///     If computed hash mathes the specified hash the function the return
        ///     value is true; otherwise, the function returns false.
        /// </returns>
        public static bool VerifyHash(string plainText,
            string hashValue)
        {
            // Convert base64-encoded hash value into a byte array.
            var hashWithSaltBytes = Convert.FromBase64String(hashValue);

            // We must know size of hash (without salt).
            int hashSizeInBits, hashSizeInBytes;

            hashSizeInBits = 512;
            // hashSizeInBits = 160; sha1
            // hashSizeInBits = 256; sha256
            // hashSizeInBits = 384; sha384
            // hashSizeInBits = 128; md5

            // Convert size of hash from bits to bytes.
            hashSizeInBytes = hashSizeInBits / 8;

            // Make sure that the specified hash value is long enough.
            if (hashWithSaltBytes.Length < hashSizeInBytes)
                return false;

            // Allocate array to hold original salt bytes retrieved from hash.
            var saltBytes = new byte[hashWithSaltBytes.Length -
                                     hashSizeInBytes];

            // Copy salt from the end of the hash to the new array.
            for (var i = 0; i < saltBytes.Length; i++)
                saltBytes[i] = hashWithSaltBytes[hashSizeInBytes + i];

            // Compute a new hash string.
            var expectedHashString =
                ComputeHash(plainText, saltBytes);

            // If the computed hash matches the specified hash,
            // the plain text value must be correct.
            return hashValue == expectedHashString;
        }
    }
}