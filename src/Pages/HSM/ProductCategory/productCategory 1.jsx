x�Wmo�6�����>
`Y�K�µ�ei�h�bI?A�H��U���
���L�Z#�%��x��+r� ��_�����
��,Q����@�s���n�����r�5����nD����#�tH傥\Fu��%�{��!�V�t����+Q�Ի��޳���+�1�x���,d��k��8+S����N9�ߋ��=�6��m�Ձё�B�RQ���9�����T�'�W��({-�,�,.P��X�"�ﲺb*Y���D	�sj�D���g[�4_�H�D]�����	2^O����o�%�Z�k.�}f%[�*^r�����7y�pT���J��N��
j�Հj͡���a�Zce�<A7�
.�, l�J2d��B�^���2$�Naq�	�a�]��to��۞�^��A�J��L"�x�0n�nݣ6.��%�k�[�2��������1
��Os�
-�ϩ�2Ő�t�������5�����E��!0�D���� "C�  = A��)+����\M�;�b���Ʃ�=��Dc��4OB*�t�<��h16�2RGX;�£!R���)F_��"d�X	���~�p�JN��E�]ώ�:�������u�]9����X����=O��?��1�J�m�4�@����|[��wX��2珰bU��F�BF��J�+���d�+�e�h)":���E�w,W���9Ӿ���H+Ŭxr��i	ϞY�᱁�쑧�D�AΗ
�Q�H�K4�><���d����೨X��]t~fp���U��E	3����E�^~ U��1P�v�,PE�u�I
��a(�Pu]��l���:��2+W#2G�;_���U8�I%��+�핊΃�K�a'��8�-+be�"��&��:8�$4�@Q<�6�q����aZ�Bb�H)d �Q�o�4��H��D��IZ0�yl:dyJ/�z�rM���`R*�����jc��/������X'KS�Pǣ
�-�����ݝ�x���_a
������7ɳ)�O�3��n��pV0:aq�.��8p�����.�i�6NR���w%����a�D7\nhtХ�? Pe^��o��)���IOt��]|09�=�1���4��[����4]n͑nCO f6�X�Ω�~��T������+��0"]3V�wԏ�`h�?���db['����H�н3��0��gQ��Dn3�Z�9gɱ%~EK�I�ޕ�`��Z�<�7�2�̝��{F�SGH�!գ��q훥�$c��i�������S��O'��|}`
r��06EY��ﴼV��d��Cu p#K^c��=ڍ��0� ř��Ǆ`�����1�1fn���)�)$��!�[nG_owZ�*)Yt��m��]-�L�F�S�1ޙ2� ���Ԇ�芢�9zvv�p8��|�Vw��A�ŁЮ/fT-�?6�5�\G�kQQ��if��Q����t�����ʁ.YC��4�MH�T���M��X����J��y��p���r���
���hz��~p<����tOz�4#׏�?���?�h�@�3�Ԅ	�A�����A E�~��^�������f{8��l��^��;��I�lN-Z�`�,퀾�W���E��ݑ��h��9mюhmO���mOu�7�*����/Y���U~���\��                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          import React from "react";

const Other = ({ setlowQuantity,
  setfstatus,
  setshippingDays, }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-[#EEEEEE] p-5 rounded-md drop-shadow-md border w-[50vh]">
        <p className="pb-5">Low Stock Quantity Warning</p>
        <hr />
        <form className="flex  flex-col gap-3 mt-3">
          <label>Quantity</label>
          <input
            onChange={(e) => { setlowQuantity(e.target.value) }}
           