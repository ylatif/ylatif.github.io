---
layout: page
title: "Place Recognition Using Generative Adversarial Networks"
subtitle: Some initial experiments
---
![Generated Images]({{ site.url}}/projects/front_fig.png "Learned Image Translation from Summer to Winter and vice versa")

Recognizing place under extreme variations in appearance is a challenging perception task. We address this using a pair
of coupled Generative Adversarial Networks (GANs) that try to simultaneously translate between two given domains.
Any learning based method would required pairs to learn the mapping from one domain to another. However, the coupled
GANs are shown images from each domain, without and pair-to-pair information, making it a more generic approach. 

Each GAN consists of an Encoder-Decoder and a Discriminator. These discriminators learn useful features in each domain. 

For place recognition, we first translate images from the source domain (such as winter) to the target domain (summer)
and use the distances in the discriminator to make decision about similarity. 
A pre-print out our work can he found [here](https://arxiv.org/abs/1709.08810).
