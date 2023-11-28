import sys

import torch
import torch.nn.functional as F
from torch import nn

# TODO: what is this line for?
sys.path.append("PerceptualSimilarity\\")


class Dense(nn.Module):
    def __init__(
        self,
        in_features,
        out_features,
        activation="relu",
        kernel_initializer="he_normal",
    ):
        super(Dense, self).__init__()
        self.in_features = in_features
        self.out_features = out_features
        self.activation = activation
        self.kernel_initializer = kernel_initializer

        self.linear = nn.Linear(in_features, out_features)
        # initialization
        if kernel_initializer == "he_normal":
            nn.init.kaiming_normal_(self.linear.weight)
        else:
            raise NotImplementedError

    def forward(self, inputs):
        outputs = self.linear(inputs)
        if self.activation is not None:
            if self.activation == "relu":
                outputs = nn.ReLU(inplace=True)(outputs)
        return outputs


class Conv2D(nn.Module):
    def __init__(
        self, in_channels, out_channels, kernel_size=3, activation="relu", strides=1
    ):
        super(Conv2D, self).__init__()
        self.in_channels = in_channels
        self.out_channels = out_channels
        self.kernel_size = kernel_size
        self.activation = activation
        self.strides = strides

        self.conv = nn.Conv2d(
            in_channels, out_channels, kernel_size, strides, int((kernel_size - 1) / 2)
        )
        # default: using he_normal as the kernel initializer
        nn.init.kaiming_normal_(self.conv.weight)

    def forward(self, inputs):
        outputs = self.conv(inputs)
        if self.activation is not None:
            if self.activation == "relu":
                outputs = nn.ReLU(inplace=True)(outputs)
            else:
                raise NotImplementedError
        return outputs


class Flatten(nn.Module):
    def __init__(self):
        super(Flatten, self).__init__()

    def forward(self, input):
        return input.reshape(input.size(0), -1)


class PicStegaStampEncoder(nn.Module):
    def __init__(self, posenc=False):
        super(PicStegaStampEncoder, self).__init__()
        if posenc:
            self.secret_dense = nn.Sequential(
                FourierEnc(100, 5000),
                Dense(10000, 10000, activation="relu", kernel_initializer="he_normal"),
            )

        else:
            self.secret_dense = Dense(
                100, 7500, activation="relu", kernel_initializer="he_normal"
            )

        self.pre_conv = Conv2D(4, 8, 3, activation="relu")
        self.conv1 = Conv2D(8, 32, 3, activation="relu")
        self.conv2 = Conv2D(32, 32, 3, activation="relu", strides=2)
        self.conv3 = Conv2D(32, 64, 3, activation="relu", strides=2)
        self.conv4 = Conv2D(64, 128, 3, activation="relu", strides=2)
        self.conv5 = Conv2D(128, 256, 3, activation="relu", strides=2)
        self.up6 = Conv2D(256, 128, 3, activation="relu")
        self.conv6 = Conv2D(256, 128, 3, activation="relu")
        self.up7 = Conv2D(128, 64, 3, activation="relu")
        self.conv7 = Conv2D(128, 64, 3, activation="relu")
        self.up8 = Conv2D(64, 32, 3, activation="relu")
        self.conv8 = Conv2D(64, 32, 3, activation="relu")
        self.up9 = Conv2D(32, 32, 3, activation="relu")
        self.conv9 = Conv2D(68, 32, 3, activation="relu")
        self.residual = Conv2D(32, 3, 1, activation=None)

    def forward(self, inputs):
        secrect, image = inputs
        secrect = secrect - 0.5
        image = image - 0.5

        secrect = self.secret_dense(secrect)
        secrect = secrect.reshape(-1, 1, 100, 100)
        secrect_enlarged = nn.Upsample(scale_factor=(4, 4))(secrect)

        inputs = torch.cat([secrect_enlarged, image], dim=1)
        pre_conv = self.pre_conv(inputs)
        conv1 = self.conv1(pre_conv)
        conv2 = self.conv2(conv1)
        conv3 = self.conv3(conv2)
        conv4 = self.conv4(conv3)
        conv5 = self.conv5(conv4)
        up6 = self.up6(nn.Upsample(scale_factor=(2, 2))(conv5))
        merge6 = torch.cat([conv4, up6], dim=1)
        conv6 = self.conv6(merge6)
        up7 = self.up7(nn.Upsample(scale_factor=(2, 2))(conv6))
        merge7 = torch.cat([conv3, up7], dim=1)
        conv7 = self.conv7(merge7)
        up8 = self.up8(nn.Upsample(scale_factor=(2, 2))(conv7))
        merge8 = torch.cat([conv2, up8], dim=1)
        conv8 = self.conv8(merge8)
        up9 = self.up9(nn.Upsample(scale_factor=(2, 2))(conv8))
        merge9 = torch.cat([conv1, up9, inputs], dim=1)
        conv9 = self.conv9(merge9)
        residual = self.residual(conv9)
        return residual


class StegaStampEncoder(nn.Module):
    def __init__(self, posenc=False):
        super(StegaStampEncoder, self).__init__()
        if posenc:
            self.secret_dense = nn.Sequential(
                FourierEnc(100, 3750),
                Dense(7500, 7500, activation="relu", kernel_initializer="he_normal"),
            )

        else:
            self.secret_dense = Dense(
                100, 7500, activation="relu", kernel_initializer="he_normal"
            )

        self.conv1 = Conv2D(6, 32, 3, activation="relu")
        self.conv2 = Conv2D(32, 32, 3, activation="relu", strides=2)
        self.conv3 = Conv2D(32, 64, 3, activation="relu", strides=2)
        self.conv4 = Conv2D(64, 128, 3, activation="relu", strides=2)
        self.conv5 = Conv2D(128, 256, 3, activation="relu", strides=2)
        self.up6 = Conv2D(256, 128, 3, activation="relu")
        self.conv6 = Conv2D(256, 128, 3, activation="relu")
        self.up7 = Conv2D(128, 64, 3, activation="relu")
        self.conv7 = Conv2D(128, 64, 3, activation="relu")
        self.up8 = Conv2D(64, 32, 3, activation="relu")
        self.conv8 = Conv2D(64, 32, 3, activation="relu")
        self.up9 = Conv2D(32, 32, 3, activation="relu")
        self.conv9 = Conv2D(70, 32, 3, activation="relu")
        self.residual = Conv2D(32, 3, 1, activation=None)

    def forward(self, inputs):
        secrect, image = inputs
        secrect = secrect - 0.5
        image = image - 0.5

        secrect = self.secret_dense(secrect)
        secrect = secrect.reshape(-1, 3, 50, 50)
        secrect_enlarged = nn.Upsample(scale_factor=(8, 8))(secrect)

        inputs = torch.cat([secrect_enlarged, image], dim=1)
        conv1 = self.conv1(inputs)
        conv2 = self.conv2(conv1)
        conv3 = self.conv3(conv2)
        conv4 = self.conv4(conv3)
        conv5 = self.conv5(conv4)
        up6 = self.up6(nn.Upsample(scale_factor=(2, 2))(conv5))
        merge6 = torch.cat([conv4, up6], dim=1)
        conv6 = self.conv6(merge6)
        up7 = self.up7(nn.Upsample(scale_factor=(2, 2))(conv6))
        merge7 = torch.cat([conv3, up7], dim=1)
        conv7 = self.conv7(merge7)
        up8 = self.up8(nn.Upsample(scale_factor=(2, 2))(conv7))
        merge8 = torch.cat([conv2, up8], dim=1)
        conv8 = self.conv8(merge8)
        up9 = self.up9(nn.Upsample(scale_factor=(2, 2))(conv8))
        merge9 = torch.cat([conv1, up9, inputs], dim=1)
        conv9 = self.conv9(merge9)
        residual = self.residual(conv9)
        return residual


class SpatialTransformerNetwork(nn.Module):
    def __init__(self):
        super(SpatialTransformerNetwork, self).__init__()
        self.localization = nn.Sequential(
            Conv2D(3, 32, 3, strides=2, activation="relu"),
            Conv2D(32, 64, 3, strides=2, activation="relu"),
            Conv2D(64, 128, 3, strides=2, activation="relu"),
            Flatten(),
            Dense(320000, 128, activation="relu"),
            nn.Linear(128, 6),
        )
        self.localization[-1].weight.data.fill_(0)
        self.localization[-1].bias.data = torch.FloatTensor([1, 0, 0, 0, 1, 0])

    def forward(self, image):
        theta = self.localization(image)
        theta = theta.view(-1, 2, 3)
        grid = F.affine_grid(theta, image.size(), align_corners=False)
        transformed_image = F.grid_sample(image, grid, align_corners=False)
        return transformed_image


class StegaStampDecoder(nn.Module):
    def __init__(self, secret_size=100):
        super(StegaStampDecoder, self).__init__()
        self.secret_size = secret_size
        self.stn = SpatialTransformerNetwork()
        self.decoder = nn.Sequential(
            Conv2D(3, 32, 3, strides=2, activation="relu"),
            Conv2D(32, 32, 3, activation="relu"),
            Conv2D(32, 64, 3, strides=2, activation="relu"),
            Conv2D(64, 64, 3, activation="relu"),
            Conv2D(64, 64, 3, strides=2, activation="relu"),
            Conv2D(64, 128, 3, strides=2, activation="relu"),
            Conv2D(128, 128, 3, strides=2, activation="relu"),
            Flatten(),
            Dense(21632, 512, activation="relu"),
            Dense(512, secret_size, activation=None),
        )

    def forward(self, image):
        image = image - 0.5
        transformed_image = self.stn(image)
        return torch.sigmoid(self.decoder(transformed_image))


class Discriminator(nn.Module):
    def __init__(self):
        super(Discriminator, self).__init__()
        self.model = nn.Sequential(
            Conv2D(3, 8, 3, strides=2, activation="relu"),
            Conv2D(8, 16, 3, strides=2, activation="relu"),
            Conv2D(16, 32, 3, strides=2, activation="relu"),
            Conv2D(32, 64, 3, strides=2, activation="relu"),
            Conv2D(64, 1, 3, activation=None),
        )

    def forward(self, image):
        x = image - 0.5
        x = self.model(x)
        output = torch.mean(x)
        return output, x
